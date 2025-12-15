import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/career-hub/Layout";
import Breadcrumbs from "@/components/career-hub/Breadcrumbs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Home, ShoppingCart, Car, DollarSign, ArrowRight } from "lucide-react";
import { usLocations } from "@/data/locations";
import CTASection from "@/components/career-hub/CTASection";

const CostOfLivingComparison = () => {
  const [city1, setCity1] = useState("austin");
  const [city2, setCity2] = useState("houston");

  const location1 = useMemo(() => usLocations.find(l => l.slug === city1), [city1]);
  const location2 = useMemo(() => usLocations.find(l => l.slug === city2), [city2]);

  const comparison = useMemo(() => {
    if (!location1 || !location2) return null;

    const rentDiff = ((location2.costOfLiving.rent.oneBed - location1.costOfLiving.rent.oneBed) / location1.costOfLiving.rent.oneBed) * 100;
    const groceriesDiff = ((location2.costOfLiving.groceries - location1.costOfLiving.groceries) / location1.costOfLiving.groceries) * 100;
    const transportDiff = ((location2.costOfLiving.transport - location1.costOfLiving.transport) / location1.costOfLiving.transport) * 100;
    
    const totalCost1 = location1.costOfLiving.rent.oneBed + location1.costOfLiving.groceries + location1.costOfLiving.transport;
    const totalCost2 = location2.costOfLiving.rent.oneBed + location2.costOfLiving.groceries + location2.costOfLiving.transport;
    const totalDiff = ((totalCost2 - totalCost1) / totalCost1) * 100;

    return {
      rentDiff: rentDiff.toFixed(1),
      groceriesDiff: groceriesDiff.toFixed(1),
      transportDiff: transportDiff.toFixed(1),
      totalDiff: totalDiff.toFixed(1),
      totalCost1,
      totalCost2,
    };
  }, [location1, location2]);

  const formatDiff = (diff: string) => {
    const num = parseFloat(diff);
    if (num > 0) return `+${diff}%`;
    return `${diff}%`;
  };

  const getDiffColor = (diff: string) => {
    const num = parseFloat(diff);
    if (num > 0) return "text-destructive";
    if (num < 0) return "text-success";
    return "text-muted-foreground";
  };

  return (
    <>
      <Helmet>
        <title>Cost of Living Comparison | Indeed Flex Career Hub</title>
        <meta name="description" content="Compare cost of living between US cities. See rent, groceries, and transport costs to find where your money goes furthest." />
        <link rel="canonical" href="https://indeedflex.com/career-hub/tools/cost-of-living" />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: "Tools", href: "/career-hub/tools" },
            { label: "Cost of Living" }
          ]} />
        </div>

        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/20 rounded-full">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Cost of Living Comparison
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Compare expenses between cities to find where your money goes furthest.
            </p>
          </div>
        </section>

        {/* Comparison Tool */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* City Selectors */}
              <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                <div className="flex-1 w-full">
                  <Select value={city1} onValueChange={setCity1}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select first city" />
                    </SelectTrigger>
                    <SelectContent>
                      {usLocations.map((loc) => (
                        <SelectItem key={loc.slug} value={loc.slug}>
                          {loc.city}, {loc.stateCode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center">
                  <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90 md:rotate-0" />
                </div>
                <div className="flex-1 w-full">
                  <Select value={city2} onValueChange={setCity2}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select second city" />
                    </SelectTrigger>
                    <SelectContent>
                      {usLocations.map((loc) => (
                        <SelectItem key={loc.slug} value={loc.slug}>
                          {loc.city}, {loc.stateCode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Comparison Cards */}
              {location1 && location2 && comparison && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* City 1 Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {location1.city}, {location1.stateCode}
                      </CardTitle>
                      <CardDescription>Monthly Expenses</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b">
                        <div className="flex items-center gap-3">
                          <Home className="h-5 w-5 text-muted-foreground" />
                          <span>1-Bedroom Rent</span>
                        </div>
                        <span className="font-semibold">${location1.costOfLiving.rent.oneBed}</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b">
                        <div className="flex items-center gap-3">
                          <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                          <span>Groceries</span>
                        </div>
                        <span className="font-semibold">${location1.costOfLiving.groceries}</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b">
                        <div className="flex items-center gap-3">
                          <Car className="h-5 w-5 text-muted-foreground" />
                          <span>Transport</span>
                        </div>
                        <span className="font-semibold">${location1.costOfLiving.transport}</span>
                      </div>
                      <div className="flex items-center justify-between py-3 bg-secondary rounded-lg px-4">
                        <span className="font-medium">Total</span>
                        <span className="text-xl font-bold text-primary">${comparison.totalCost1}/mo</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* City 2 Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {location2.city}, {location2.stateCode}
                      </CardTitle>
                      <CardDescription>Monthly Expenses</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b">
                        <div className="flex items-center gap-3">
                          <Home className="h-5 w-5 text-muted-foreground" />
                          <span>1-Bedroom Rent</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">${location2.costOfLiving.rent.oneBed}</span>
                          <span className={`text-sm ${getDiffColor(comparison.rentDiff)}`}>
                            {formatDiff(comparison.rentDiff)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b">
                        <div className="flex items-center gap-3">
                          <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                          <span>Groceries</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">${location2.costOfLiving.groceries}</span>
                          <span className={`text-sm ${getDiffColor(comparison.groceriesDiff)}`}>
                            {formatDiff(comparison.groceriesDiff)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b">
                        <div className="flex items-center gap-3">
                          <Car className="h-5 w-5 text-muted-foreground" />
                          <span>Transport</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">${location2.costOfLiving.transport}</span>
                          <span className={`text-sm ${getDiffColor(comparison.transportDiff)}`}>
                            {formatDiff(comparison.transportDiff)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-3 bg-secondary rounded-lg px-4">
                        <span className="font-medium">Total</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-primary">${comparison.totalCost2}/mo</span>
                          <span className={`text-sm font-medium ${getDiffColor(comparison.totalDiff)}`}>
                            {formatDiff(comparison.totalDiff)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Summary */}
              {comparison && (
                <Card className="mt-8 bg-primary text-primary-foreground">
                  <CardContent className="py-6">
                    <div className="text-center">
                      <p className="text-lg mb-2">
                        Living in <strong>{location2?.city}</strong> is
                      </p>
                      <p className="text-4xl font-bold mb-2">
                        {Math.abs(parseFloat(comparison.totalDiff)).toFixed(1)}%
                      </p>
                      <p className="text-lg">
                        {parseFloat(comparison.totalDiff) > 0 ? "more expensive" : "cheaper"} than <strong>{location1?.city}</strong>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Wage Comparison */}
              {location1 && location2 && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-success" />
                        Average Hourly Wages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>{location1.city}</span>
                          <span className="font-semibold">${location1.avgHourlyWage.min}-${location1.avgHourlyWage.max}/hr</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>{location2.city}</span>
                          <span className="font-semibold">${location2.avgHourlyWage.min}-${location2.avgHourlyWage.max}/hr</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Top Industries</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm text-muted-foreground">{location1.city}</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {location1.topIndustries.slice(0, 3).map(ind => (
                              <span key={ind} className="text-xs bg-secondary px-2 py-1 rounded-full">
                                {ind}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">{location2.city}</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {location2.topIndustries.slice(0, 3).map(ind => (
                              <span key={ind} className="text-xs bg-secondary px-2 py-1 rounded-full">
                                {ind}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </section>

        <CTASection 
          title="Find Work in Your Ideal City"
          subtitle="Indeed Flex has opportunities in all major US markets."
        />
      </Layout>
    </>
  );
};

export default CostOfLivingComparison;
