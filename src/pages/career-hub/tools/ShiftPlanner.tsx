import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Clock, Calendar } from "lucide-react";
import CTASection from "@/components/career-hub/CTASection";

const ShiftPlanner = () => {
  const [hourlyRate, setHourlyRate] = useState(15);
  const [shiftsPerWeek, setShiftsPerWeek] = useState(4);
  const [hoursPerShift, setHoursPerShift] = useState(8);
  const [tipsPerShift, setTipsPerShift] = useState(25);

  const calculations = useMemo(() => {
    const weeklyHours = shiftsPerWeek * hoursPerShift;
    const weeklyBase = weeklyHours * hourlyRate;
    const weeklyTips = shiftsPerWeek * tipsPerShift;
    const weeklyTotal = weeklyBase + weeklyTips;
    const monthlyTotal = weeklyTotal * 4.33;
    const yearlyTotal = weeklyTotal * 52;

    return {
      weeklyHours,
      weeklyBase: weeklyBase.toFixed(2),
      weeklyTips: weeklyTips.toFixed(2),
      weeklyTotal: weeklyTotal.toFixed(2),
      monthlyTotal: monthlyTotal.toFixed(2),
      yearlyTotal: yearlyTotal.toFixed(2),
    };
  }, [hourlyRate, shiftsPerWeek, hoursPerShift, tipsPerShift]);

  return (
    <>
      <Helmet>
        <title>Shift Income Planner | Indeed Flex Career Hub</title>
        <meta name="description" content="Plan your weekly and monthly earnings based on shifts, hours, and tips. Interactive shift planner for flexible workers." />
        <link rel="canonical" href="https://indeedflex.com/career-hub/tools/shift-planner" />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Shift Planner" }
          ]} />
        </div>

        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/20 rounded-full">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Shift Income Planner
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Plan your earnings based on how many shifts you want to work and how much you expect to make.
            </p>
          </div>
        </section>

        {/* Planner */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Plan Your Shifts</CardTitle>
                  <CardDescription>
                    Adjust the sliders to see how different schedules affect your earnings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Hourly Rate</Label>
                      <span className="font-semibold text-primary">${hourlyRate}/hr</span>
                    </div>
                    <Slider
                      value={[hourlyRate]}
                      onValueChange={([value]) => setHourlyRate(value)}
                      min={10}
                      max={35}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$10</span>
                      <span>$35</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Shifts Per Week</Label>
                      <span className="font-semibold text-primary">{shiftsPerWeek} shifts</span>
                    </div>
                    <Slider
                      value={[shiftsPerWeek]}
                      onValueChange={([value]) => setShiftsPerWeek(value)}
                      min={1}
                      max={7}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>7</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Hours Per Shift</Label>
                      <span className="font-semibold text-primary">{hoursPerShift} hours</span>
                    </div>
                    <Slider
                      value={[hoursPerShift]}
                      onValueChange={([value]) => setHoursPerShift(value)}
                      min={4}
                      max={12}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>4 hrs</span>
                      <span>12 hrs</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Tips Per Shift</Label>
                      <span className="font-semibold text-primary">${tipsPerShift}</span>
                    </div>
                    <Slider
                      value={[tipsPerShift]}
                      onValueChange={([value]) => setTipsPerShift(value)}
                      min={0}
                      max={150}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$0</span>
                      <span>$150</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Card */}
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">Projected Earnings</CardTitle>
                  <CardDescription className="text-primary-foreground/70">
                    Based on your selected schedule
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Weekly Summary */}
                  <div className="bg-primary-foreground/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-5 w-5 text-accent" />
                      <span className="font-medium">Weekly Summary</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-primary-foreground/70">Hours</div>
                        <div className="text-xl font-bold">{calculations.weeklyHours} hrs</div>
                      </div>
                      <div>
                        <div className="text-sm text-primary-foreground/70">Shifts</div>
                        <div className="text-xl font-bold">{shiftsPerWeek}</div>
                      </div>
                    </div>
                  </div>

                  {/* Earnings Breakdown */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-primary-foreground/20">
                      <span className="text-primary-foreground/70">Base Pay (Weekly)</span>
                      <span className="font-medium">${calculations.weeklyBase}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-primary-foreground/20">
                      <span className="text-primary-foreground/70">Tips (Weekly)</span>
                      <span className="font-medium">${calculations.weeklyTips}</span>
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="space-y-4 pt-4">
                    <div className="bg-primary-foreground/10 rounded-lg p-4 flex justify-between items-center">
                      <span>Weekly Total</span>
                      <span className="text-2xl font-bold">${calculations.weeklyTotal}</span>
                    </div>
                    <div className="bg-primary-foreground/10 rounded-lg p-4 flex justify-between items-center">
                      <span>Monthly Total</span>
                      <span className="text-2xl font-bold">${calculations.monthlyTotal}</span>
                    </div>
                    <div className="bg-accent/20 rounded-lg p-4 flex justify-between items-center">
                      <span>Yearly Potential</span>
                      <span className="text-3xl font-bold text-accent">${calculations.yearlyTotal}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                Tips to Maximize Your Earnings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card rounded-lg p-6 text-center">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Pick Peak Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Evening and weekend shifts often have higher tips and premium rates.
                  </p>
                </div>
                <div className="bg-card rounded-lg p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Build Your Rating</h3>
                  <p className="text-sm text-muted-foreground">
                    Higher-rated workers get access to better-paying shifts.
                  </p>
                </div>
                <div className="bg-card rounded-lg p-6 text-center">
                  <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Specialize</h3>
                  <p className="text-sm text-muted-foreground">
                    Certifications (forklift, bartending) unlock higher-paying roles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection 
          title="Ready to Start Earning?"
          subtitle="Find shifts that match your schedule and income goals."
        />
      </Layout>
    </>
  );
};

export default ShiftPlanner;
