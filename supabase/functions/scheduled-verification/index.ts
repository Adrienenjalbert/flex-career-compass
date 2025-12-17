import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

const firecrawlApiKey = Deno.env.get("FIRECRAWL_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const resendApiKey = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Admin email(s) to notify - update this with actual admin emails
const ADMIN_EMAILS = ["admin@example.com"];

// Verification sources
const verificationSources = {
  minimumWage: "https://www.dol.gov/agencies/whd/minimum-wage/state",
  unemployment: "https://oui.doleta.gov/unemploy/data_summary/DataSum.asp",
};

// State data (simplified for edge function)
const stateData: Record<string, { name: string; minWage: number; maxWeeklyBenefit: number }> = {
  CA: { name: "California", minWage: 16.50, maxWeeklyBenefit: 450 },
  TX: { name: "Texas", minWage: 7.25, maxWeeklyBenefit: 563 },
  FL: { name: "Florida", minWage: 13.00, maxWeeklyBenefit: 275 },
  NY: { name: "New York", minWage: 16.50, maxWeeklyBenefit: 504 },
  PA: { name: "Pennsylvania", minWage: 7.25, maxWeeklyBenefit: 594 },
  IL: { name: "Illinois", minWage: 14.00, maxWeeklyBenefit: 707 },
  OH: { name: "Ohio", minWage: 10.70, maxWeeklyBenefit: 561 },
  GA: { name: "Georgia", minWage: 7.25, maxWeeklyBenefit: 365 },
  NC: { name: "North Carolina", minWage: 7.25, maxWeeklyBenefit: 350 },
  MI: { name: "Michigan", minWage: 10.56, maxWeeklyBenefit: 362 },
};

interface Mismatch {
  state: string;
  stateCode: string;
  field: string;
  localValue: string;
  scrapedValue: string;
  source: string;
}

async function scrapeUrl(url: string): Promise<string | null> {
  if (!firecrawlApiKey) {
    console.error("FIRECRAWL_API_KEY not configured");
    return null;
  }

  try {
    const response = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${firecrawlApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        formats: ["markdown"],
        onlyMainContent: true,
      }),
    });

    const data = await response.json();
    if (data.success) {
      return data.data?.markdown || null;
    }
    console.error("Scrape failed:", data.error);
    return null;
  } catch (error) {
    console.error("Scrape error:", error);
    return null;
  }
}

function parseMinWage(content: string, stateName: string): number | null {
  const patterns = [
    new RegExp(`${stateName}[^$]*\\$([\\d.]+)`, "i"),
    new RegExp(`\\$([\\d.]+)[^$]*${stateName}`, "i"),
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      const value = parseFloat(match[1]);
      if (value >= 7 && value <= 25) {
        return value;
      }
    }
  }
  return null;
}

function parseUnemployment(content: string, stateName: string): number | null {
  const patterns = [
    new RegExp(`${stateName}[^$]*\\$([\\d,]+)`, "i"),
    new RegExp(`\\$([\\d,]+)[^$]*${stateName}`, "i"),
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      const value = parseInt(match[1].replace(",", ""));
      if (value >= 200 && value <= 1500) {
        return value;
      }
    }
  }
  return null;
}

// deno-lint-ignore no-explicit-any
async function saveCorrection(supabase: SupabaseClient<any, any, any>, mismatch: Mismatch) {
  const { error } = await supabase.from("data_corrections").upsert(
    {
      source_name: mismatch.source,
      source_url:
        mismatch.field === "minWage"
          ? verificationSources.minimumWage
          : verificationSources.unemployment,
      local_file:
        mismatch.field === "minWage"
          ? "src/data/state-taxes.ts"
          : "src/data/unemployment-benefits.ts",
      state_code: mismatch.stateCode,
      field_name: mismatch.field,
      category: mismatch.field === "minWage" ? "Minimum Wage" : "Unemployment Benefits",
      current_value: mismatch.localValue,
      suggested_value: mismatch.scrapedValue,
      status: "pending",
    },
    {
      onConflict: "local_file,state_code,field_name",
    }
  );

  if (error) {
    console.error("Error saving correction:", error);
  }
}

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  if (!resendApiKey) {
    console.error("RESEND_API_KEY not configured");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Career Hub <onboarding@resend.dev>",
        to: [to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Email send failed:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Email error:", error);
    return false;
  }
}

function generateEmailHtml(mismatches: Mismatch[], verificationDate: string): string {
  const mismatchRows = mismatches
    .map(
      (m) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px; font-weight: 500;">${m.state} (${m.stateCode})</td>
        <td style="padding: 12px;">${m.field}</td>
        <td style="padding: 12px; color: #dc2626; font-family: monospace;">${m.localValue}</td>
        <td style="padding: 12px; color: #16a34a; font-family: monospace;">${m.scrapedValue}</td>
        <td style="padding: 12px; font-size: 12px;">${m.source}</td>
      </tr>
    `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Data Verification Alert</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background: white; border-radius: 8px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h1 style="color: #1f2937; margin-top: 0;">⚠️ Data Verification Alert</h1>
        <p style="color: #6b7280;">
          The scheduled monthly data verification found <strong style="color: #dc2626;">${mismatches.length} data mismatch${mismatches.length !== 1 ? "es" : ""}</strong> 
          that require your attention.
        </p>
        
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 12px; margin: 16px 0;">
          <strong style="color: #dc2626;">Action Required:</strong>
          <span style="color: #7f1d1d;"> Please review these mismatches in the Data Verification tool and approve/reject the corrections.</span>
        </div>

        <h2 style="color: #374151; font-size: 18px; margin-top: 24px;">Mismatches Found</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr style="background: #f3f4f6;">
              <th style="padding: 12px; text-align: left; font-weight: 600;">State</th>
              <th style="padding: 12px; text-align: left; font-weight: 600;">Field</th>
              <th style="padding: 12px; text-align: left; font-weight: 600;">Local Value</th>
              <th style="padding: 12px; text-align: left; font-weight: 600;">Scraped Value</th>
              <th style="padding: 12px; text-align: left; font-weight: 600;">Source</th>
            </tr>
          </thead>
          <tbody>
            ${mismatchRows}
          </tbody>
        </table>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            Verification Date: ${verificationDate}<br>
            This is an automated message from the Indeed Flex Career Hub Data Verification System.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  console.log("Starting scheduled data verification...");
  const verificationDate = new Date().toISOString();

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const mismatches: Mismatch[] = [];

    // Scrape minimum wage data
    console.log("Scraping DOL Minimum Wage...");
    const minWageContent = await scrapeUrl(verificationSources.minimumWage);

    // Scrape unemployment data
    console.log("Scraping DOL Unemployment...");
    const unemploymentContent = await scrapeUrl(verificationSources.unemployment);

    // Check each state
    for (const [stateCode, data] of Object.entries(stateData)) {
      // Check minimum wage
      if (minWageContent) {
        const scrapedMinWage = parseMinWage(minWageContent, data.name);
        if (scrapedMinWage && Math.abs(scrapedMinWage - data.minWage) >= 0.5) {
          const mismatch: Mismatch = {
            state: data.name,
            stateCode,
            field: "minWage",
            localValue: `$${data.minWage}`,
            scrapedValue: `$${scrapedMinWage}`,
            source: "DOL Minimum Wage",
          };
          mismatches.push(mismatch);
          await saveCorrection(supabase, mismatch);
        }
      }

      // Check unemployment
      if (unemploymentContent) {
        const scrapedUnemployment = parseUnemployment(unemploymentContent, data.name);
        if (
          scrapedUnemployment &&
          Math.abs(scrapedUnemployment - data.maxWeeklyBenefit) >= 50
        ) {
          const mismatch: Mismatch = {
            state: data.name,
            stateCode,
            field: "maxWeeklyBenefit",
            localValue: `$${data.maxWeeklyBenefit}`,
            scrapedValue: `$${scrapedUnemployment}`,
            source: "DOL Unemployment",
          };
          mismatches.push(mismatch);
          await saveCorrection(supabase, mismatch);
        }
      }
    }

    console.log(`Verification complete. Found ${mismatches.length} mismatches.`);

    // Send email if mismatches found
    if (mismatches.length > 0) {
      console.log("Sending alert email to admins...");

      const emailHtml = generateEmailHtml(mismatches, verificationDate);
      const subject = `⚠️ Data Verification Alert: ${mismatches.length} Mismatch${mismatches.length !== 1 ? "es" : ""} Found`;

      for (const adminEmail of ADMIN_EMAILS) {
        const sent = await sendEmail(adminEmail, subject, emailHtml);
        if (sent) {
          console.log(`Alert email sent to ${adminEmail}`);
        } else {
          console.error(`Failed to send email to ${adminEmail}`);
        }
      }
    } else {
      console.log("No mismatches found. No email sent.");
    }

    return new Response(
      JSON.stringify({
        success: true,
        verificationDate,
        mismatchesFound: mismatches.length,
        mismatches,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Scheduled verification error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
