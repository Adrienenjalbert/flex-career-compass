// Childcare costs by state - Data from Child Care Aware of America 2026
// Source: https://www.childcareaware.org/our-issues/research/the-us-and-the-high-price-of-child-care/

export interface StateChildcareCosts {
  name: string;
  abbreviation: string;
  // Center-based care (annual costs)
  centerInfant: number;      // 0-12 months
  centerToddler: number;     // 12-35 months
  centerPreschool: number;   // 3-5 years (4-year-old)
  centerSchoolAge: number;   // Before/after school (5-12)
  // Family childcare (annual costs)
  familyInfant: number;
  familyToddler: number;
  familyPreschool: number;
  familySchoolAge: number;
  // State subsidy program info
  subsidyIncomeLimit: number;  // As % of Federal Poverty Level
  subsidyAgencyName: string;
  subsidyAgencyUrl: string;
}

// 2026 Federal Poverty Level for family of 4: $32,400 (estimated)
export const FEDERAL_POVERTY_LEVEL_2026 = 32400;

// IRS Child and Dependent Care Tax Credit 2026
export const CDCTC_LIMITS = {
  oneChild: 3000,
  twoOrMoreChildren: 6000,
  // Credit percentage based on AGI
  creditPercentages: [
    { maxAGI: 15000, percentage: 35 },
    { maxAGI: 17000, percentage: 34 },
    { maxAGI: 19000, percentage: 33 },
    { maxAGI: 21000, percentage: 32 },
    { maxAGI: 23000, percentage: 31 },
    { maxAGI: 25000, percentage: 30 },
    { maxAGI: 27000, percentage: 29 },
    { maxAGI: 29000, percentage: 28 },
    { maxAGI: 31000, percentage: 27 },
    { maxAGI: 33000, percentage: 26 },
    { maxAGI: 35000, percentage: 25 },
    { maxAGI: 37000, percentage: 24 },
    { maxAGI: 39000, percentage: 23 },
    { maxAGI: 41000, percentage: 22 },
    { maxAGI: 43000, percentage: 21 },
    { maxAGI: Infinity, percentage: 20 },
  ]
};

// Dependent Care FSA limit 2026
export const DCFSA_LIMIT = 5000;

// National averages for reference
export const NATIONAL_AVERAGES = {
  centerInfant: 15417,
  centerToddler: 13669,
  centerPreschool: 12246,
  centerSchoolAge: 8339,
  familyInfant: 11258,
  familyToddler: 10452,
  familyPreschool: 9936,
  familySchoolAge: 7176,
};

export const stateChildcareCosts: StateChildcareCosts[] = [
  {
    name: "Alabama",
    abbreviation: "AL",
    centerInfant: 8632,
    centerToddler: 8424,
    centerPreschool: 8008,
    centerSchoolAge: 5200,
    familyInfant: 6240,
    familyToddler: 5980,
    familyPreschool: 5720,
    familySchoolAge: 4680,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "Alabama DHR",
    subsidyAgencyUrl: "https://dhr.alabama.gov/child-care-services/"
  },
  {
    name: "Alaska",
    abbreviation: "AK",
    centerInfant: 14508,
    centerToddler: 13416,
    centerPreschool: 11700,
    centerSchoolAge: 8580,
    familyInfant: 10920,
    familyToddler: 10140,
    familyPreschool: 9360,
    familySchoolAge: 7800,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "Alaska DHSS",
    subsidyAgencyUrl: "https://health.alaska.gov/dpa/Pages/ccare/default.aspx"
  },
  {
    name: "Arizona",
    abbreviation: "AZ",
    centerInfant: 13572,
    centerToddler: 11388,
    centerPreschool: 10140,
    centerSchoolAge: 6760,
    familyInfant: 9100,
    familyToddler: 8580,
    familyPreschool: 8060,
    familySchoolAge: 5980,
    subsidyIncomeLimit: 165,
    subsidyAgencyName: "Arizona DES",
    subsidyAgencyUrl: "https://des.az.gov/services/child-and-family/child-care"
  },
  {
    name: "Arkansas",
    abbreviation: "AR",
    centerInfant: 8268,
    centerToddler: 7800,
    centerPreschool: 7020,
    centerSchoolAge: 5200,
    familyInfant: 6500,
    familyToddler: 6240,
    familyPreschool: 5720,
    familySchoolAge: 4680,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "Arkansas DHS",
    subsidyAgencyUrl: "https://humanservices.arkansas.gov/divisions-shared-services/division-of-child-care-early-childhood-education/"
  },
  {
    name: "California",
    abbreviation: "CA",
    centerInfant: 22628,
    centerToddler: 18460,
    centerPreschool: 16665,
    centerSchoolAge: 11180,
    familyInfant: 13520,
    familyToddler: 12480,
    familyPreschool: 11440,
    familySchoolAge: 9100,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "California DSS",
    subsidyAgencyUrl: "https://cdss.ca.gov/inforesources/child-care-licensing"
  },
  {
    name: "Colorado",
    abbreviation: "CO",
    centerInfant: 18564,
    centerToddler: 16380,
    centerPreschool: 14508,
    centerSchoolAge: 9880,
    familyInfant: 12480,
    familyToddler: 11440,
    familyPreschool: 10400,
    familySchoolAge: 7800,
    subsidyIncomeLimit: 185,
    subsidyAgencyName: "Colorado CDHS",
    subsidyAgencyUrl: "https://cdhs.colorado.gov/our-services/child-and-family-services/child-care-assistance-program"
  },
  {
    name: "Connecticut",
    abbreviation: "CT",
    centerInfant: 17160,
    centerToddler: 15600,
    centerPreschool: 14820,
    centerSchoolAge: 10660,
    familyInfant: 12220,
    familyToddler: 11180,
    familyPreschool: 10400,
    familySchoolAge: 7800,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "Connecticut OEC",
    subsidyAgencyUrl: "https://www.ctoec.org/care-4-kids/"
  },
  {
    name: "Delaware",
    abbreviation: "DE",
    centerInfant: 14040,
    centerToddler: 12480,
    centerPreschool: 11180,
    centerSchoolAge: 7800,
    familyInfant: 9620,
    familyToddler: 8840,
    familyPreschool: 8060,
    familySchoolAge: 6240,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "Delaware DHSS",
    subsidyAgencyUrl: "https://dhss.delaware.gov/dss/childcare.html"
  },
  {
    name: "District of Columbia",
    abbreviation: "DC",
    centerInfant: 26193,
    centerToddler: 24087,
    centerPreschool: 20981,
    centerSchoolAge: 13780,
    familyInfant: 15600,
    familyToddler: 14560,
    familyPreschool: 13520,
    familySchoolAge: 10400,
    subsidyIncomeLimit: 250,
    subsidyAgencyName: "DC OSSE",
    subsidyAgencyUrl: "https://osse.dc.gov/service/child-care-subsidy-program"
  },
  {
    name: "Florida",
    abbreviation: "FL",
    centerInfant: 11544,
    centerToddler: 10452,
    centerPreschool: 9412,
    centerSchoolAge: 6500,
    familyInfant: 8320,
    familyToddler: 7800,
    familyPreschool: 7280,
    familySchoolAge: 5720,
    subsidyIncomeLimit: 150,
    subsidyAgencyName: "Florida DEL",
    subsidyAgencyUrl: "https://www.floridaearlylearning.com/school-readiness/school-readiness-eligibility"
  },
  {
    name: "Georgia",
    abbreviation: "GA",
    centerInfant: 10556,
    centerToddler: 9880,
    centerPreschool: 9100,
    centerSchoolAge: 6500,
    familyInfant: 7800,
    familyToddler: 7280,
    familyPreschool: 6760,
    familySchoolAge: 5200,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "Georgia DECAL",
    subsidyAgencyUrl: "https://decal.ga.gov/CAPS/Default.aspx"
  },
  {
    name: "Hawaii",
    abbreviation: "HI",
    centerInfant: 16848,
    centerToddler: 14976,
    centerPreschool: 12324,
    centerSchoolAge: 8580,
    familyInfant: 11700,
    familyToddler: 10660,
    familyPreschool: 9620,
    familySchoolAge: 7280,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "Hawaii DHS",
    subsidyAgencyUrl: "https://humanservices.hawaii.gov/bessd/child-care/"
  },
  {
    name: "Idaho",
    abbreviation: "ID",
    centerInfant: 10660,
    centerToddler: 9880,
    centerPreschool: 8840,
    centerSchoolAge: 6240,
    familyInfant: 7800,
    familyToddler: 7280,
    familyPreschool: 6760,
    familySchoolAge: 5200,
    subsidyIncomeLimit: 130,
    subsidyAgencyName: "Idaho DHW",
    subsidyAgencyUrl: "https://healthandwelfare.idaho.gov/services-programs/children-families/iccp-child-care-assistance"
  },
  {
    name: "Illinois",
    abbreviation: "IL",
    centerInfant: 17316,
    centerToddler: 15288,
    centerPreschool: 13416,
    centerSchoolAge: 9100,
    familyInfant: 11180,
    familyToddler: 10400,
    familyPreschool: 9620,
    familySchoolAge: 7280,
    subsidyIncomeLimit: 225,
    subsidyAgencyName: "Illinois DHS",
    subsidyAgencyUrl: "https://www.dhs.state.il.us/page.aspx?item=30355"
  },
  {
    name: "Indiana",
    abbreviation: "IN",
    centerInfant: 13728,
    centerToddler: 12480,
    centerPreschool: 11180,
    centerSchoolAge: 7800,
    familyInfant: 9620,
    familyToddler: 8840,
    familyPreschool: 8060,
    familySchoolAge: 6240,
    subsidyIncomeLimit: 127,
    subsidyAgencyName: "Indiana FSSA",
    subsidyAgencyUrl: "https://www.in.gov/fssa/carefinder/"
  },
  {
    name: "Iowa",
    abbreviation: "IA",
    centerInfant: 13104,
    centerToddler: 11856,
    centerPreschool: 10660,
    centerSchoolAge: 7280,
    familyInfant: 9100,
    familyToddler: 8320,
    familyPreschool: 7800,
    familySchoolAge: 5980,
    subsidyIncomeLimit: 145,
    subsidyAgencyName: "Iowa DHS",
    subsidyAgencyUrl: "https://dhs.iowa.gov/child-care-assistance"
  },
  {
    name: "Kansas",
    abbreviation: "KS",
    centerInfant: 13572,
    centerToddler: 12480,
    centerPreschool: 11180,
    centerSchoolAge: 7800,
    familyInfant: 9100,
    familyToddler: 8580,
    familyPreschool: 7800,
    familySchoolAge: 5980,
    subsidyIncomeLimit: 185,
    subsidyAgencyName: "Kansas DCF",
    subsidyAgencyUrl: "https://www.dcf.ks.gov/services/ees/Pages/Child_Care.aspx"
  },
  {
    name: "Kentucky",
    abbreviation: "KY",
    centerInfant: 10140,
    centerToddler: 9360,
    centerPreschool: 8580,
    centerSchoolAge: 6240,
    familyInfant: 7800,
    familyToddler: 7280,
    familyPreschool: 6760,
    familySchoolAge: 5200,
    subsidyIncomeLimit: 160,
    subsidyAgencyName: "Kentucky CHFS",
    subsidyAgencyUrl: "https://chfs.ky.gov/agencies/dcbs/dcc/Pages/ccap.aspx"
  },
  {
    name: "Louisiana",
    abbreviation: "LA",
    centerInfant: 9256,
    centerToddler: 8580,
    centerPreschool: 7800,
    centerSchoolAge: 5720,
    familyInfant: 7020,
    familyToddler: 6500,
    familyPreschool: 5980,
    familySchoolAge: 4680,
    subsidyIncomeLimit: 65,
    subsidyAgencyName: "Louisiana DCF",
    subsidyAgencyUrl: "https://www.dcfs.louisiana.gov/page/child-care-assistance-program"
  },
  {
    name: "Maine",
    abbreviation: "ME",
    centerInfant: 13260,
    centerToddler: 12012,
    centerPreschool: 10920,
    centerSchoolAge: 7540,
    familyInfant: 9100,
    familyToddler: 8580,
    familyPreschool: 7800,
    familySchoolAge: 5980,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "Maine DHHS",
    subsidyAgencyUrl: "https://www.maine.gov/dhhs/ocfs/provider/cc-voucher.shtml"
  },
  {
    name: "Maryland",
    abbreviation: "MD",
    centerInfant: 18096,
    centerToddler: 15444,
    centerPreschool: 13572,
    centerSchoolAge: 9360,
    familyInfant: 11440,
    familyToddler: 10400,
    familyPreschool: 9620,
    familySchoolAge: 7280,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "Maryland MSDE",
    subsidyAgencyUrl: "https://earlychildhood.marylandpublicschools.org/child-care-scholarship-program"
  },
  {
    name: "Massachusetts",
    abbreviation: "MA",
    centerInfant: 23088,
    centerToddler: 21060,
    centerPreschool: 18564,
    centerSchoolAge: 12740,
    familyInfant: 14040,
    familyToddler: 13000,
    familyPreschool: 11960,
    familySchoolAge: 9100,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "Massachusetts EEC",
    subsidyAgencyUrl: "https://www.mass.gov/child-care-financial-assistance-voucher"
  },
  {
    name: "Michigan",
    abbreviation: "MI",
    centerInfant: 12948,
    centerToddler: 11700,
    centerPreschool: 10400,
    centerSchoolAge: 7280,
    familyInfant: 9100,
    familyToddler: 8580,
    familyPreschool: 7800,
    familySchoolAge: 5980,
    subsidyIncomeLimit: 150,
    subsidyAgencyName: "Michigan DHHS",
    subsidyAgencyUrl: "https://www.michigan.gov/mdhhs/adult-child-serv/child-serv/child-care"
  },
  {
    name: "Minnesota",
    abbreviation: "MN",
    centerInfant: 20280,
    centerToddler: 17940,
    centerPreschool: 15600,
    centerSchoolAge: 10660,
    familyInfant: 12480,
    familyToddler: 11700,
    familyPreschool: 10660,
    familySchoolAge: 8060,
    subsidyIncomeLimit: 115,
    subsidyAgencyName: "Minnesota DHS",
    subsidyAgencyUrl: "https://mn.gov/dhs/people-we-serve/children-and-families/services/child-care/"
  },
  {
    name: "Mississippi",
    abbreviation: "MS",
    centerInfant: 7176,
    centerToddler: 6864,
    centerPreschool: 6240,
    centerSchoolAge: 4680,
    familyInfant: 5720,
    familyToddler: 5460,
    familyPreschool: 5200,
    familySchoolAge: 4160,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "Mississippi MDHS",
    subsidyAgencyUrl: "https://www.mdhs.ms.gov/child-care/"
  },
  {
    name: "Missouri",
    abbreviation: "MO",
    centerInfant: 12168,
    centerToddler: 10920,
    centerPreschool: 9880,
    centerSchoolAge: 6760,
    familyInfant: 8320,
    familyToddler: 7800,
    familyPreschool: 7280,
    familySchoolAge: 5720,
    subsidyIncomeLimit: 138,
    subsidyAgencyName: "Missouri DSS",
    subsidyAgencyUrl: "https://dss.mo.gov/fsd/child-care/"
  },
  {
    name: "Montana",
    abbreviation: "MT",
    centerInfant: 11388,
    centerToddler: 10400,
    centerPreschool: 9360,
    centerSchoolAge: 6500,
    familyInfant: 8320,
    familyToddler: 7800,
    familyPreschool: 7280,
    familySchoolAge: 5720,
    subsidyIncomeLimit: 150,
    subsidyAgencyName: "Montana DPHHS",
    subsidyAgencyUrl: "https://dphhs.mt.gov/hcsd/childcare/bestbeginningschildcarescholarships"
  },
  {
    name: "Nebraska",
    abbreviation: "NE",
    centerInfant: 13884,
    centerToddler: 12480,
    centerPreschool: 11180,
    centerSchoolAge: 7800,
    familyInfant: 9100,
    familyToddler: 8580,
    familyPreschool: 7800,
    familySchoolAge: 5980,
    subsidyIncomeLimit: 185,
    subsidyAgencyName: "Nebraska DHHS",
    subsidyAgencyUrl: "https://dhhs.ne.gov/Pages/Child-Care-Subsidy-Program.aspx"
  },
  {
    name: "Nevada",
    abbreviation: "NV",
    centerInfant: 14352,
    centerToddler: 12480,
    centerPreschool: 10920,
    centerSchoolAge: 7540,
    familyInfant: 9620,
    familyToddler: 8840,
    familyPreschool: 8060,
    familySchoolAge: 6240,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "Nevada DWSS",
    subsidyAgencyUrl: "https://dwss.nv.gov/Child_Care/Child_Care_Services/"
  },
  {
    name: "New Hampshire",
    abbreviation: "NH",
    centerInfant: 15600,
    centerToddler: 14040,
    centerPreschool: 12480,
    centerSchoolAge: 8580,
    familyInfant: 10400,
    familyToddler: 9620,
    familyPreschool: 8840,
    familySchoolAge: 6760,
    subsidyIncomeLimit: 220,
    subsidyAgencyName: "New Hampshire DHHS",
    subsidyAgencyUrl: "https://www.dhhs.nh.gov/programs-services/child-care-services/child-care-scholarship"
  },
  {
    name: "New Jersey",
    abbreviation: "NJ",
    centerInfant: 16536,
    centerToddler: 14820,
    centerPreschool: 12792,
    centerSchoolAge: 8840,
    familyInfant: 10920,
    familyToddler: 10140,
    familyPreschool: 9360,
    familySchoolAge: 7280,
    subsidyIncomeLimit: 200,
    subsidyAgencyName: "New Jersey DHS",
    subsidyAgencyUrl: "https://www.childcarenj.gov/"
  },
  {
    name: "New Mexico",
    abbreviation: "NM",
    centerInfant: 11232,
    centerToddler: 10140,
    centerPreschool: 9100,
    centerSchoolAge: 6500,
    familyInfant: 8060,
    familyToddler: 7540,
    familyPreschool: 6760,
    familySchoolAge: 5200,
    subsidyIncomeLimit: 350,
    subsidyAgencyName: "New Mexico CYFD",
    subsidyAgencyUrl: "https://www.cyfd.nm.gov/child-care-services/"
  },
  {
    name: "New York",
    abbreviation: "NY",
    centerInfant: 18876,
    centerToddler: 16692,
    centerPreschool: 14820,
    centerSchoolAge: 10140,
    familyInfant: 12480,
    familyToddler: 11700,
    familyPreschool: 10660,
    familySchoolAge: 8060,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "New York OCFS",
    subsidyAgencyUrl: "https://ocfs.ny.gov/programs/childcare/"
  },
  {
    name: "North Carolina",
    abbreviation: "NC",
    centerInfant: 11700,
    centerToddler: 10660,
    centerPreschool: 9620,
    centerSchoolAge: 6760,
    familyInfant: 8580,
    familyToddler: 7800,
    familyPreschool: 7280,
    familySchoolAge: 5720,
    subsidyIncomeLimit: 200,
    subsidyAgencyName: "North Carolina DCDEE",
    subsidyAgencyUrl: "https://ncchildcare.ncdhhs.gov/"
  },
  {
    name: "North Dakota",
    abbreviation: "ND",
    centerInfant: 11856,
    centerToddler: 10920,
    centerPreschool: 9880,
    centerSchoolAge: 6760,
    familyInfant: 8060,
    familyToddler: 7540,
    familyPreschool: 6760,
    familySchoolAge: 5200,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "North Dakota DHS",
    subsidyAgencyUrl: "https://www.nd.gov/dhs/services/childcare/assistance/"
  },
  {
    name: "Ohio",
    abbreviation: "OH",
    centerInfant: 12480,
    centerToddler: 11180,
    centerPreschool: 10140,
    centerSchoolAge: 7020,
    familyInfant: 8840,
    familyToddler: 8320,
    familyPreschool: 7540,
    familySchoolAge: 5720,
    subsidyIncomeLimit: 142,
    subsidyAgencyName: "Ohio ODJFS",
    subsidyAgencyUrl: "https://jfs.ohio.gov/families/child-care"
  },
  {
    name: "Oklahoma",
    abbreviation: "OK",
    centerInfant: 10140,
    centerToddler: 9360,
    centerPreschool: 8320,
    centerSchoolAge: 5980,
    familyInfant: 7280,
    familyToddler: 6760,
    familyPreschool: 6240,
    familySchoolAge: 4940,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "Oklahoma DHS",
    subsidyAgencyUrl: "https://oklahoma.gov/okdhs/services/cc.html"
  },
  {
    name: "Oregon",
    abbreviation: "OR",
    centerInfant: 17784,
    centerToddler: 15600,
    centerPreschool: 13416,
    centerSchoolAge: 9100,
    familyInfant: 11180,
    familyToddler: 10400,
    familyPreschool: 9620,
    familySchoolAge: 7280,
    subsidyIncomeLimit: 200,
    subsidyAgencyName: "Oregon DELC",
    subsidyAgencyUrl: "https://oregonearlylearning.com/employment-related-day-care-erdc"
  },
  {
    name: "Pennsylvania",
    abbreviation: "PA",
    centerInfant: 14508,
    centerToddler: 12948,
    centerPreschool: 11700,
    centerSchoolAge: 8060,
    familyInfant: 10140,
    familyToddler: 9360,
    familyPreschool: 8580,
    familySchoolAge: 6500,
    subsidyIncomeLimit: 200,
    subsidyAgencyName: "Pennsylvania OCDEL",
    subsidyAgencyUrl: "https://www.dhs.pa.gov/Services/Children/Pages/Child-Care-Works-Program.aspx"
  },
  {
    name: "Rhode Island",
    abbreviation: "RI",
    centerInfant: 16224,
    centerToddler: 14664,
    centerPreschool: 13104,
    centerSchoolAge: 9100,
    familyInfant: 10660,
    familyToddler: 9880,
    familyPreschool: 9100,
    familySchoolAge: 6760,
    subsidyIncomeLimit: 180,
    subsidyAgencyName: "Rhode Island DHS",
    subsidyAgencyUrl: "https://dhs.ri.gov/programs-and-services/child-care"
  },
  {
    name: "South Carolina",
    abbreviation: "SC",
    centerInfant: 9516,
    centerToddler: 8840,
    centerPreschool: 8060,
    centerSchoolAge: 5720,
    familyInfant: 7020,
    familyToddler: 6500,
    familyPreschool: 5980,
    familySchoolAge: 4680,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "South Carolina DSS",
    subsidyAgencyUrl: "https://dss.sc.gov/assistance-programs/sc-voucher/"
  },
  {
    name: "South Dakota",
    abbreviation: "SD",
    centerInfant: 10400,
    centerToddler: 9620,
    centerPreschool: 8580,
    centerSchoolAge: 6240,
    familyInfant: 7540,
    familyToddler: 7020,
    familyPreschool: 6500,
    familySchoolAge: 5200,
    subsidyIncomeLimit: 220,
    subsidyAgencyName: "South Dakota DSS",
    subsidyAgencyUrl: "https://dss.sd.gov/childcare/"
  },
  {
    name: "Tennessee",
    abbreviation: "TN",
    centerInfant: 10452,
    centerToddler: 9620,
    centerPreschool: 8840,
    centerSchoolAge: 6240,
    familyInfant: 7800,
    familyToddler: 7280,
    familyPreschool: 6760,
    familySchoolAge: 5200,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "Tennessee DHS",
    subsidyAgencyUrl: "https://www.tn.gov/humanservices/for-families/child-care-services.html"
  },
  {
    name: "Texas",
    abbreviation: "TX",
    centerInfant: 11349,
    centerToddler: 10921,
    centerPreschool: 10225,
    centerSchoolAge: 7020,
    familyInfant: 8580,
    familyToddler: 8060,
    familyPreschool: 7540,
    familySchoolAge: 5720,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "Texas Workforce Commission",
    subsidyAgencyUrl: "https://www.twc.texas.gov/programs/child-care-services"
  },
  {
    name: "Utah",
    abbreviation: "UT",
    centerInfant: 12792,
    centerToddler: 11700,
    centerPreschool: 10400,
    centerSchoolAge: 7280,
    familyInfant: 8840,
    familyToddler: 8320,
    familyPreschool: 7540,
    familySchoolAge: 5720,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "Utah DWS",
    subsidyAgencyUrl: "https://jobs.utah.gov/occ/index.html"
  },
  {
    name: "Vermont",
    abbreviation: "VT",
    centerInfant: 15132,
    centerToddler: 13572,
    centerPreschool: 12168,
    centerSchoolAge: 8580,
    familyInfant: 10400,
    familyToddler: 9620,
    familyPreschool: 8840,
    familySchoolAge: 6760,
    subsidyIncomeLimit: 350,
    subsidyAgencyName: "Vermont AHS",
    subsidyAgencyUrl: "https://dcf.vermont.gov/benefits/ccfap"
  },
  {
    name: "Virginia",
    abbreviation: "VA",
    centerInfant: 15288,
    centerToddler: 13572,
    centerPreschool: 11856,
    centerSchoolAge: 8060,
    familyInfant: 10140,
    familyToddler: 9360,
    familyPreschool: 8580,
    familySchoolAge: 6500,
    subsidyIncomeLimit: 85,
    subsidyAgencyName: "Virginia DSS",
    subsidyAgencyUrl: "https://www.dss.virginia.gov/family/cc/index.cgi"
  },
  {
    name: "Washington",
    abbreviation: "WA",
    centerInfant: 19032,
    centerToddler: 16380,
    centerPreschool: 14040,
    centerSchoolAge: 9620,
    familyInfant: 12480,
    familyToddler: 11440,
    familyPreschool: 10400,
    familySchoolAge: 7800,
    subsidyIncomeLimit: 60,
    subsidyAgencyName: "Washington DCYF",
    subsidyAgencyUrl: "https://www.dcyf.wa.gov/services/earlylearning-childcare/getting-help"
  },
  {
    name: "West Virginia",
    abbreviation: "WV",
    centerInfant: 10920,
    centerToddler: 9880,
    centerPreschool: 8840,
    centerSchoolAge: 6240,
    familyInfant: 7540,
    familyToddler: 7020,
    familyPreschool: 6500,
    familySchoolAge: 5200,
    subsidyIncomeLimit: 150,
    subsidyAgencyName: "West Virginia DHHR",
    subsidyAgencyUrl: "https://dhhr.wv.gov/bcf/ece/Pages/default.aspx"
  },
  {
    name: "Wisconsin",
    abbreviation: "WI",
    centerInfant: 15444,
    centerToddler: 13572,
    centerPreschool: 11856,
    centerSchoolAge: 8060,
    familyInfant: 10400,
    familyToddler: 9620,
    familyPreschool: 8580,
    familySchoolAge: 6500,
    subsidyIncomeLimit: 185,
    subsidyAgencyName: "Wisconsin DCF",
    subsidyAgencyUrl: "https://dcf.wisconsin.gov/wishares"
  },
  {
    name: "Wyoming",
    abbreviation: "WY",
    centerInfant: 12324,
    centerToddler: 11180,
    centerPreschool: 10140,
    centerSchoolAge: 7020,
    familyInfant: 8580,
    familyToddler: 7800,
    familyPreschool: 7280,
    familySchoolAge: 5720,
    subsidyIncomeLimit: 150,
    subsidyAgencyName: "Wyoming DFS",
    subsidyAgencyUrl: "https://dfs.wyo.gov/assistance-programs/child-care/"
  }
];

// Helper function to get state by abbreviation
export const getStateChildcareCosts = (abbreviation: string): StateChildcareCosts | undefined => {
  return stateChildcareCosts.find(state => state.abbreviation === abbreviation);
};

// Helper to calculate CDCTC percentage based on AGI
export const getCDCTCPercentage = (agi: number): number => {
  const bracket = CDCTC_LIMITS.creditPercentages.find(b => agi <= b.maxAGI);
  return bracket ? bracket.percentage : 20;
};

// Helper to calculate full CDCTC
export const calculateCDCTC = (
  agi: number, 
  qualifyingExpenses: number, 
  numberOfChildren: number
): number => {
  const maxEligible = numberOfChildren >= 2 
    ? CDCTC_LIMITS.twoOrMoreChildren 
    : CDCTC_LIMITS.oneChild;
  
  const eligibleExpenses = Math.min(qualifyingExpenses, maxEligible);
  const percentage = getCDCTCPercentage(agi);
  
  return Math.round(eligibleExpenses * (percentage / 100));
};

// Age categories for childcare
export type ChildAgeCategory = 'infant' | 'toddler' | 'preschool' | 'schoolAge';

export const AGE_CATEGORIES: Record<ChildAgeCategory, { label: string; description: string }> = {
  infant: { label: 'Infant', description: '0-12 months' },
  toddler: { label: 'Toddler', description: '1-3 years' },
  preschool: { label: 'Preschool', description: '3-5 years' },
  schoolAge: { label: 'School-Age', description: '5-12 years (before/after school)' }
};

// Care type options
export type CareType = 'center' | 'family';

export const CARE_TYPES: Record<CareType, { label: string; description: string }> = {
  center: { label: 'Center-Based Care', description: 'Daycare centers, preschools' },
  family: { label: 'Family Child Care', description: 'Home-based care providers' }
};
