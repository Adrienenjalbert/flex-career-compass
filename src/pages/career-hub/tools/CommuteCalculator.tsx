import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { 
  Car, 
  Train, 
  Clock, 
  DollarSign, 
  Fuel, 
  MapPin, 
  Calculator,
  TrendingDown,
  Calendar,
  Bike,
  ParkingCircle,
  Lightbulb,
  ArrowRight,
  Info
} from "lucide-react";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import CTASection from "@/components/career-hub/CTASection";
import FAQSection from "@/components/career-hub/FAQSection";
import ToolDisclaimer from "@/components/career-hub/ToolDisclaimer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  vehicleTypes, 
  stateGasPrices,
  cityTransitCosts,
  NATIONAL_AVERAGES,
  IRS_MILEAGE_RATE_2026,
  getStateGasPrice,
  getVehicleType,
  getCityTransit,
  calculateFuelCostPerMile,
  calculateTimeValue
} from "@/data/commute-costs";

type CommuteMethod = "car" | "transit" | "mixed" | "bike";

const faqs = [
  {
    question: "How is the cost per mile calculated?",
    answer: "We use AAA's 2026 Your Driving Costs data which includes all vehicle expenses: fuel, maintenance, tires, insurance, depreciation, and registration. This gives a true picture of driving costs beyond just gas."
  },
  {
    question: "Why is my commute cost so high even with good gas mileage?",
    answer: "Gas is typically only 15-20% of total driving costs. Depreciation (wear on your car), insurance, maintenance, and tires make up the majority. A car that gets 35 MPG still costs 50-70 cents per mile when you factor everything in."
  },
  {
    question: "Should I include parking costs?",
    answer: "Absolutely! Downtown parking can cost $200-400/month in major cities. This is often the hidden cost that makes transit more economical. Include your actual parking costs for an accurate comparison."
  },
  {
    question: "How do I value my commute time?",
    answer: "We calculate time value at your hourly wage rate. If you earn $20/hour and commute 1 hour each way, that's $40/day in 'lost' time. This helps compare a shorter expensive commute vs. a longer cheap one."
  },
  {
    question: "Is public transit really cheaper than driving?",
    answer: "Usually yes for city commutes, especially when you factor in parking. A $100/month transit pass vs. 20 miles each way of driving ($0.70/mile × 40 miles × 22 days = $616/month) plus $200 parking makes transit significantly cheaper."
  },
  {
    question: "What about working closer to home or remote work?",
    answer: "The calculator shows your breakeven wage premium - the extra hourly rate you'd need to justify a long commute. If a job 30 miles away pays $2/hour more but costs $400/month in commuting, you're losing money."
  }
];

const CommuteCalculator = () => {
  // Commute details
  const [commuteMethod, setCommuteMethod] = useState<CommuteMethod>("car");
  const [distanceMiles, setDistanceMiles] = useState<number>(15);
  const [commuteMinutes, setCommuteMinutes] = useState<number>(30);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  
  // Car-specific
  const [selectedVehicle, setSelectedVehicle] = useState<string>("medium_sedan");
  const [selectedState, setSelectedState] = useState<string>("TX");
  const [vehicleMPG, setVehicleMPG] = useState<number>(28);
  const [parkingCost, setParkingCost] = useState<number>(0);
  const [tollsCost, setTollsCost] = useState<number>(0);
  
  // Transit-specific
  const [selectedCity, setSelectedCity] = useState<string>("Houston");
  const [transitPassCost, setTransitPassCost] = useState<number>(90);
  
  // Work details
  const [hourlyWage, setHourlyWage] = useState<number>(18);
  
  // Get data
  const vehicleData = useMemo(() => getVehicleType(selectedVehicle), [selectedVehicle]);
  const stateGasData = useMemo(() => getStateGasPrice(selectedState), [selectedState]);
  const cityTransitData = useMemo(() => getCityTransit(selectedCity), [selectedCity]);
  
  // Update transit cost when city changes
  useMemo(() => {
    if (cityTransitData) {
      setTransitPassCost(cityTransitData.monthlyPass);
    }
  }, [cityTransitData]);
  
  // Sort states for dropdown
  const sortedStates = useMemo(() => 
    [...stateGasPrices].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );
  
  // Sort cities for dropdown
  const sortedCities = useMemo(() => 
    [...cityTransitCosts].sort((a, b) => a.city.localeCompare(b.city)),
    []
  );
  
  // Main calculations
  const calculations = useMemo(() => {
    const workDaysPerYear = daysPerWeek * 52;
    const workDaysPerMonth = daysPerWeek * 4.33;
    const roundTripMiles = distanceMiles * 2;
    const annualMiles = roundTripMiles * workDaysPerYear;
    
    // --- CAR COSTS ---
    const gasPrice = stateGasData?.regularGas || NATIONAL_AVERAGES.gasPricePerGallon;
    const fuelCostPerMile = calculateFuelCostPerMile(gasPrice, vehicleMPG);
    const totalCostPerMile = vehicleData?.costPerMile || NATIONAL_AVERAGES.costPerMileAvg;
    
    // Annual car costs
    const annualFuelCost = fuelCostPerMile * annualMiles;
    const annualMaintenanceCost = (vehicleData?.maintenanceCostPerMile || 0.10) * annualMiles;
    const annualDepreciationEtc = (totalCostPerMile - fuelCostPerMile - (vehicleData?.maintenanceCostPerMile || 0.10)) * annualMiles;
    const annualParkingCost = parkingCost * 12;
    const annualTollsCost = tollsCost * workDaysPerYear;
    const totalAnnualCarCost = annualFuelCost + annualMaintenanceCost + annualDepreciationEtc + annualParkingCost + annualTollsCost;
    
    // Monthly car costs
    const monthlyCarCost = totalAnnualCarCost / 12;
    const dailyCarCost = totalAnnualCarCost / workDaysPerYear;
    
    // --- TRANSIT COSTS ---
    const annualTransitCost = transitPassCost * 12;
    const monthlyTransitCost = transitPassCost;
    const dailyTransitCost = transitPassCost / workDaysPerMonth;
    
    // --- TIME VALUE ---
    const roundTripMinutes = commuteMinutes * 2;
    const annualCommuteHours = (roundTripMinutes / 60) * workDaysPerYear;
    const annualTimeValue = calculateTimeValue(hourlyWage, commuteMinutes, workDaysPerYear);
    
    // Days spent commuting per year
    const daysSpentCommuting = annualCommuteHours / 24;
    
    // --- EFFECTIVE HOURLY RATE REDUCTION ---
    // If you work 8 hours but commute 2 hours, your effective work time is 10 hours
    const dailyWorkHours = 8;
    const dailyTotalHours = dailyWorkHours + (roundTripMinutes / 60);
    const effectiveHourlyRate = (hourlyWage * dailyWorkHours - dailyCarCost) / dailyTotalHours;
    
    // --- BREAKEVEN ANALYSIS ---
    // Extra wage needed per hour to justify commute costs
    const monthlyCommuteCost = commuteMethod === "car" ? monthlyCarCost : monthlyTransitCost;
    const breakEvenWagePremium = (monthlyCommuteCost / (daysPerWeek * 4.33 * dailyWorkHours));
    
    // Maximum commute distance for it to be "worth it"
    const maxWorthwhileDistance = hourlyWage > 0 
      ? (hourlyWage * dailyWorkHours * workDaysPerMonth - 500) / (totalCostPerMile * 2 * workDaysPerMonth)
      : 0;
    
    // --- COMPARISON ---
    const carVsTransitSavings = totalAnnualCarCost - annualTransitCost;
    const transitIsCheaper = carVsTransitSavings > 0;
    
    // --- INDEED FLEX SCENARIOS ---
    const flexScenarios = [5, 4, 3, 2].map(days => {
      const yearDays = days * 52;
      const carCost = (fuelCostPerMile * roundTripMiles * yearDays) + 
                      ((vehicleData?.maintenanceCostPerMile || 0.10) * roundTripMiles * yearDays) +
                      (parkingCost * 12) + 
                      (tollsCost * yearDays);
      const transitCost = transitPassCost * 12; // Usually same regardless of days
      const savings = totalAnnualCarCost - carCost;
      return {
        days,
        carCost,
        transitCost,
        savings,
        effectiveRate: ((hourlyWage * 8 * days * 52) - carCost) / ((8 + (roundTripMinutes / 60)) * days * 52)
      };
    });
    
    return {
      // Car
      annualFuelCost,
      annualMaintenanceCost,
      annualDepreciationEtc,
      annualParkingCost,
      annualTollsCost,
      totalAnnualCarCost,
      monthlyCarCost,
      dailyCarCost,
      costPerMile: totalCostPerMile,
      fuelCostPerMile,
      annualMiles,
      
      // Transit
      annualTransitCost,
      monthlyTransitCost,
      dailyTransitCost,
      
      // Time
      annualCommuteHours,
      annualTimeValue,
      daysSpentCommuting,
      
      // Analysis
      effectiveHourlyRate,
      breakEvenWagePremium,
      maxWorthwhileDistance,
      
      // Comparison
      carVsTransitSavings,
      transitIsCheaper,
      
      // Flex scenarios
      flexScenarios,
      
      // Gas info
      gasPrice
    };
  }, [
    distanceMiles, commuteMinutes, daysPerWeek, selectedVehicle, selectedState,
    vehicleMPG, parkingCost, tollsCost, transitPassCost, hourlyWage,
    vehicleData, stateGasData, commuteMethod
  ]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatCurrencyDecimal = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <>
      <Helmet>
        <title>Commute Cost Calculator | True Cost of Getting to Work</title>
        <meta 
          name="description" 
          content="Calculate the real cost of your commute including gas, maintenance, depreciation, parking, and time. Compare driving vs public transit and see how flexible scheduling saves money." 
        />
        <link rel="canonical" href="https://flex-career-compass.lovable.app/career-hub/tools/commute-calculator" />
        <meta property="og:title" content="Commute Cost Calculator | True Cost of Commuting" />
        <meta property="og:description" content="Discover the real cost of your commute. Compare driving vs transit, factor in time value, and find your break-even distance." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Breadcrumbs 
            items={[
              { label: "Career Hub", href: "/career-hub" },
              { label: "Tools", href: "/career-hub/tools" },
              { label: "Commute Calculator" }
            ]} 
          />

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <Car className="h-5 w-5" />
              <span className="font-medium">Commute Cost Calculator</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              What's Your Commute Really Costing You?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Beyond gas money: see the true cost including depreciation, maintenance, parking, and your valuable time. 
              Compare driving vs transit and find your "break-even" distance.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Calculator */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    Your Commute Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Commute Method */}
                  <div className="space-y-3">
                    <Label>How do you commute?</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: "car", icon: Car, label: "Drive" },
                        { id: "transit", icon: Train, label: "Transit" },
                        { id: "mixed", icon: MapPin, label: "Mixed" },
                        { id: "bike", icon: Bike, label: "Bike/Walk" },
                      ].map(({ id, icon: Icon, label }) => (
                        <button
                          key={id}
                          onClick={() => setCommuteMethod(id as CommuteMethod)}
                          className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1 ${
                            commuteMethod === id 
                              ? "border-primary bg-primary/5" 
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Icon className={`h-5 w-5 ${commuteMethod === id ? "text-primary" : "text-muted-foreground"}`} />
                          <span className="text-xs font-medium">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Distance and Time */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Distance (one way)</Label>
                        <span className="text-lg font-semibold text-primary">{distanceMiles} miles</span>
                      </div>
                      <Slider
                        value={[distanceMiles]}
                        onValueChange={(v) => setDistanceMiles(v[0])}
                        min={1}
                        max={60}
                        step={1}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1 mi</span>
                        <span>US avg: 16 mi</span>
                        <span>60 mi</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Commute time (one way)</Label>
                        <span className="text-lg font-semibold text-primary">{commuteMinutes} min</span>
                      </div>
                      <Slider
                        value={[commuteMinutes]}
                        onValueChange={(v) => setCommuteMinutes(v[0])}
                        min={5}
                        max={90}
                        step={5}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>5 min</span>
                        <span>US avg: 28 min</span>
                        <span>90 min</span>
                      </div>
                    </div>
                  </div>

                  {/* Days per week */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Days per week commuting</Label>
                      <span className="text-lg font-semibold text-primary">{daysPerWeek} days</span>
                    </div>
                    <Slider
                      value={[daysPerWeek]}
                      onValueChange={(v) => setDaysPerWeek(v[0])}
                      min={1}
                      max={6}
                      step={1}
                    />
                  </div>

                  {/* Your hourly wage */}
                  <div className="space-y-2">
                    <Label htmlFor="hourlyWage">Your Hourly Wage ($)</Label>
                    <Input
                      id="hourlyWage"
                      type="number"
                      min={7.25}
                      max={100}
                      step={0.5}
                      value={hourlyWage}
                      onChange={(e) => setHourlyWage(Number(e.target.value))}
                    />
                    <p className="text-xs text-muted-foreground">Used to calculate the time value of your commute</p>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs for Car vs Transit details */}
              <Tabs defaultValue="car" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="car" className="flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    Driving Costs
                  </TabsTrigger>
                  <TabsTrigger value="transit" className="flex items-center gap-2">
                    <Train className="h-4 w-4" />
                    Transit Costs
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="car">
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      {/* State for gas prices */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Your State</Label>
                          <Select value={selectedState} onValueChange={setSelectedState}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {sortedStates.map(state => (
                                <SelectItem key={state.abbreviation} value={state.abbreviation}>
                                  {state.name} (${state.regularGas.toFixed(2)}/gal)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Vehicle type */}
                        <div className="space-y-2">
                          <Label>Vehicle Type</Label>
                          <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {vehicleTypes.map(v => (
                                <SelectItem key={v.id} value={v.id}>
                                  {v.name} ({formatCurrencyDecimal(v.costPerMile)}/mi)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* MPG */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Your Vehicle's MPG</Label>
                          <span className="font-semibold">{vehicleMPG} MPG</span>
                        </div>
                        <Slider
                          value={[vehicleMPG]}
                          onValueChange={(v) => setVehicleMPG(v[0])}
                          min={10}
                          max={60}
                          step={1}
                        />
                      </div>

                      {/* Parking and Tolls */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="parking">Monthly Parking ($)</Label>
                          <Input
                            id="parking"
                            type="number"
                            min={0}
                            max={500}
                            value={parkingCost}
                            onChange={(e) => setParkingCost(Number(e.target.value))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tolls">Daily Tolls ($)</Label>
                          <Input
                            id="tolls"
                            type="number"
                            min={0}
                            max={50}
                            step={0.5}
                            value={tollsCost}
                            onChange={(e) => setTollsCost(Number(e.target.value))}
                          />
                        </div>
                      </div>

                      {vehicleData && (
                        <Alert className="bg-muted/50">
                          <Info className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            <strong>{vehicleData.name}:</strong> {vehicleData.description}. 
                            Total cost includes fuel, maintenance, insurance, depreciation, and registration.
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="transit">
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      {/* City selection */}
                      <div className="space-y-2">
                        <Label>Your City</Label>
                        <Select value={selectedCity} onValueChange={setSelectedCity}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {sortedCities.map(city => (
                              <SelectItem key={city.city} value={city.city}>
                                {city.city}, {city.state} - {formatCurrency(city.monthlyPass)}/mo ({city.transitAgency})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Monthly pass cost */}
                      <div className="space-y-2">
                        <Label htmlFor="transitPass">Monthly Pass Cost ($)</Label>
                        <Input
                          id="transitPass"
                          type="number"
                          min={0}
                          max={500}
                          value={transitPassCost}
                          onChange={(e) => setTransitPassCost(Number(e.target.value))}
                        />
                        <p className="text-xs text-muted-foreground">
                          Adjust if your actual cost differs from the default
                        </p>
                      </div>

                      {cityTransitData && (
                        <Alert className="bg-muted/50">
                          <Info className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            <strong>{cityTransitData.transitAgency}:</strong> {cityTransitData.notes}
                            {cityTransitData.dailyCap && ` Daily cap: $${cityTransitData.dailyCap}`}
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Flexible Schedule Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Flexible Schedule Savings
                  </CardTitle>
                  <CardDescription>
                    See how working fewer days or closer to home saves money
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 font-medium">Schedule</th>
                          <th className="text-right py-3 font-medium">Annual Car Cost</th>
                          <th className="text-right py-3 font-medium">vs 5 Days</th>
                          <th className="text-right py-3 font-medium">Effective $/hr</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculations.flexScenarios.map((row) => (
                          <tr 
                            key={row.days} 
                            className={`border-b ${row.days === daysPerWeek ? "bg-primary/5" : ""}`}
                          >
                            <td className="py-3">
                              {row.days} days/week
                              {row.days === daysPerWeek && (
                                <Badge variant="secondary" className="ml-2 text-xs">Current</Badge>
                              )}
                            </td>
                            <td className="text-right py-3">
                              {formatCurrency(row.carCost)}
                            </td>
                            <td className={`text-right py-3 ${row.savings > 0 ? "text-green-600" : ""}`}>
                              {row.savings > 0 ? `Save ${formatCurrency(row.savings)}` : "-"}
                            </td>
                            <td className="text-right py-3 font-medium">
                              {formatCurrencyDecimal(row.effectiveRate)}/hr
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <Alert className="mt-4 bg-primary/5 border-primary/20">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    <AlertDescription className="text-sm">
                      <strong>Indeed Flex Insight:</strong> With Indeed Flex, you can choose shifts closer to home or 
                      work fewer days per week. Working 3 days instead of 5 could save you {formatCurrency(calculations.flexScenarios[0].carCost - calculations.flexScenarios[2].carCost)}/year in commute costs alone!
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="space-y-6">
              {/* Main Cost Card */}
              <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg text-muted-foreground mb-1">Your Annual Commute Cost</h3>
                    <div className="text-4xl font-bold text-primary">
                      {formatCurrency(commuteMethod === "car" ? calculations.totalAnnualCarCost : calculations.annualTransitCost)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatCurrency((commuteMethod === "car" ? calculations.monthlyCarCost : calculations.monthlyTransitCost))}/month
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span className="text-sm text-muted-foreground">Daily cost</span>
                      <span className="font-semibold">
                        {formatCurrencyDecimal(commuteMethod === "car" ? calculations.dailyCarCost : calculations.dailyTransitCost)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                      <span className="text-sm text-muted-foreground">Miles driven/year</span>
                      <span className="font-semibold">{calculations.annualMiles.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Time Value Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Time Spent Commuting
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-foreground">
                      {Math.round(calculations.annualCommuteHours)} hours/year
                    </div>
                    <p className="text-sm text-muted-foreground">
                      That's <strong>{calculations.daysSpentCommuting.toFixed(1)} full days</strong> of your life
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Time value at your wage</span>
                    <span className="font-semibold text-amber-600">
                      {formatCurrency(calculations.annualTimeValue)}/year
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Driving Cost Breakdown */}
              {commuteMethod === "car" && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-primary" />
                      Driving Cost Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Fuel ({formatCurrencyDecimal(calculations.fuelCostPerMile)}/mi)</span>
                      <span>{formatCurrency(calculations.annualFuelCost)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Maintenance & Tires</span>
                      <span>{formatCurrency(calculations.annualMaintenanceCost)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Depreciation, Insurance, etc.</span>
                      <span>{formatCurrency(calculations.annualDepreciationEtc)}</span>
                    </div>
                    {parkingCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Parking</span>
                        <span>{formatCurrency(calculations.annualParkingCost)}</span>
                      </div>
                    )}
                    {tollsCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tolls</span>
                        <span>{formatCurrency(calculations.annualTollsCost)}</span>
                      </div>
                    )}
                    <div className="border-t pt-3 flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatCurrency(calculations.totalAnnualCarCost)}</span>
                    </div>
                    
                    <div className="pt-2 text-sm text-center">
                      <span className="text-muted-foreground">Gas price: </span>
                      <span className="font-medium">${calculations.gasPrice.toFixed(2)}/gallon</span>
                      <span className="text-muted-foreground"> in {selectedState}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Car vs Transit Comparison */}
              <Card className={`${calculations.transitIsCheaper ? "border-green-500/30 bg-green-50/50 dark:bg-green-950/20" : "border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20"}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Car vs Transit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Driving annually</span>
                    <span className="font-medium">{formatCurrency(calculations.totalAnnualCarCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Transit annually</span>
                    <span className="font-medium">{formatCurrency(calculations.annualTransitCost)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className={`text-center p-3 rounded-lg ${calculations.transitIsCheaper ? "bg-green-100 dark:bg-green-900/30" : "bg-amber-100 dark:bg-amber-900/30"}`}>
                      <p className={`font-semibold ${calculations.transitIsCheaper ? "text-green-700 dark:text-green-400" : "text-amber-700 dark:text-amber-400"}`}>
                        {calculations.transitIsCheaper 
                          ? `Transit saves ${formatCurrency(calculations.carVsTransitSavings)}/year`
                          : `Driving saves ${formatCurrency(Math.abs(calculations.carVsTransitSavings))}/year`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Break-even Analysis */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-primary" />
                    Break-Even Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-1">
                      Your commute reduces effective hourly rate to
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {formatCurrencyDecimal(calculations.effectiveHourlyRate)}/hr
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      (vs ${hourlyWage.toFixed(2)}/hr stated wage)
                    </div>
                  </div>
                  
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Wage premium needed for commute</span>
                      <span className="font-medium">+{formatCurrencyDecimal(calculations.breakEvenWagePremium)}/hr</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      A job paying ${(hourlyWage + calculations.breakEvenWagePremium).toFixed(2)}/hr with no commute = same net income
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8">
            <ToolDisclaimer
              type="calculator"
              customText="Vehicle operating costs are based on AAA's 2024 Your Driving Costs study. Actual costs vary based on your specific vehicle, driving habits, and local conditions. Gas prices are averages and fluctuate. Transit costs are from agency websites as of December 2024."
              sources={["AAA 2024 Your Driving Costs", "EIA Gas Prices", "Transit Agency Fare Data"]}
              lastUpdated="December 2024"
            />
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <FAQSection 
              faqs={faqs} 
              title="Frequently Asked Questions"
            />
          </div>

          {/* CTA Section */}
          <CTASection />
        </div>
      </Layout>
    </>
  );
};

export default CommuteCalculator;
