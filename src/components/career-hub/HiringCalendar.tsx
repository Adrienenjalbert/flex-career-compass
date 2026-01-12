import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  TrendingUp, 
  ArrowRight,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { contentCalendar, seasons, seasonalEvents, type ContentCalendarMonth } from "@/data/seasonal-hiring";

const HiringCalendar = () => {
  const currentMonth = new Date().getMonth(); // 0-11
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const getDemandColor = (level: ContentCalendarMonth['trafficPotential']) => {
    switch (level) {
      case 'very-high': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-slate-400';
    }
  };
  
  const getDemandHeight = (level: ContentCalendarMonth['trafficPotential']) => {
    switch (level) {
      case 'very-high': return 'h-24';
      case 'high': return 'h-20';
      case 'medium': return 'h-14';
      default: return 'h-8';
    }
  };
  
  const getMonthData = (monthName: string) => {
    return contentCalendar.find(m => m.month === monthName);
  };
  
  const getActiveSeasons = (monthIndex: number) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[monthIndex];
    
    return seasons.filter(season => season.months.includes(monthName));
  };
  
  const getActiveEvents = (monthIndex: number) => {
    // Map events to their approximate months
    const eventMonthMap: Record<string, number[]> = {
      'black-friday-2026': [10, 11], // November
      'prime-day-2026': [6], // July
      'super-bowl-2026': [1], // February
      'concert-season-2026': [4, 5, 6, 7, 8], // May-September
      'new-years-2026': [11, 0], // December-January
    };
    
    return seasonalEvents.filter(event => 
      eventMonthMap[event.id]?.includes(monthIndex)
    );
  };
  
  const selectedMonthData = getMonthData(months[selectedMonth]);
  const activeSeasons = getActiveSeasons(selectedMonth);
  const activeEvents = getActiveEvents(selectedMonth);
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedMonth(prev => (prev === 0 ? 11 : prev - 1));
    } else {
      setSelectedMonth(prev => (prev === 11 ? 0 : prev + 1));
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Interactive Timeline Bar */}
      <div className="relative">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigateMonth('prev')}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h3 className="text-xl font-bold">{months[selectedMonth]} 2026</h3>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigateMonth('next')}
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Visual Timeline */}
        <div className="relative bg-secondary/30 rounded-xl p-4 overflow-hidden">
          {/* Background grid */}
          <div className="flex items-end gap-1 h-28">
            {months.map((month, index) => {
              const monthData = getMonthData(month);
              const isSelected = index === selectedMonth;
              const isCurrent = index === currentMonth;
              
              return (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(index)}
                  className={cn(
                    "flex-1 relative transition-all duration-300 rounded-t-md group",
                    getDemandHeight(monthData?.trafficPotential || 'low'),
                    getDemandColor(monthData?.trafficPotential || 'low'),
                    isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                    !isSelected && "opacity-60 hover:opacity-80"
                  )}
                  aria-label={`${month}: ${monthData?.trafficPotential || 'low'} demand`}
                >
                  {/* Month label */}
                  <span className={cn(
                    "absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap transition-colors",
                    isSelected ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {month.slice(0, 3)}
                  </span>
                  
                  {/* Current month indicator */}
                  {isCurrent && (
                    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full" />
                  )}
                  
                  {/* Hover tooltip */}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none z-10">
                    {monthData?.trafficPotential || 'low'} demand
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-10 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-red-500" />
              <span>Very High</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-orange-500" />
              <span>High</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-yellow-500" />
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-slate-400" />
              <span>Lower</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Selected Month Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in" key={selectedMonth}>
        {/* Focus & Demand */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">{months[selectedMonth]} Focus</h4>
                <p className="text-muted-foreground">{selectedMonthData?.focus || 'General hiring'}</p>
              </div>
              <Badge 
                className={cn(
                  "text-white",
                  selectedMonthData?.trafficPotential === 'very-high' && "bg-red-500",
                  selectedMonthData?.trafficPotential === 'high' && "bg-orange-500",
                  selectedMonthData?.trafficPotential === 'medium' && "bg-yellow-500 text-black",
                  selectedMonthData?.trafficPotential === 'low' && "bg-slate-500"
                )}
              >
                {selectedMonthData?.trafficPotential === 'very-high' && <Flame className="h-3 w-3 mr-1" />}
                {selectedMonthData?.trafficPotential === 'high' && <TrendingUp className="h-3 w-3 mr-1" />}
                {selectedMonthData?.trafficPotential?.replace('-', ' ').toUpperCase() || 'LOW'} DEMAND
              </Badge>
            </div>
            
            {/* Active Seasons */}
            {activeSeasons.length > 0 && (
              <div className="mb-4">
                <h5 className="text-sm font-medium text-muted-foreground mb-2">Active Seasons</h5>
                <div className="flex flex-wrap gap-2">
                  {activeSeasons.map(season => {
                    const SeasonIcon = season.icon;
                    return (
                      <Link
                        key={season.id}
                        to={`/${season.slug}`}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                      >
                        <SeasonIcon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{season.name}</span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Active Events */}
            {activeEvents.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-muted-foreground mb-2">Major Events</h5>
                <div className="flex flex-wrap gap-2">
                  {activeEvents.map(event => {
                    const EventIcon = event.icon;
                    return (
                      <Link
                        key={event.id}
                        to={`/${event.slug}`}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
                      >
                        <EventIcon className="h-4 w-4 text-accent" />
                        <span className="text-sm font-medium">{event.name}</span>
                        <Badge variant="secondary" className="text-xs">{event.date}</Badge>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            
            {activeSeasons.length === 0 && activeEvents.length === 0 && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Briefcase className="h-5 w-5" />
                <span>General hiring period - great time to build experience and ratings!</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Quick Tips */}
        <div className="bg-card border rounded-xl p-6">
          <h4 className="text-lg font-semibold mb-4">Tips for {months[selectedMonth]}</h4>
          <ul className="space-y-3 text-sm">
            {selectedMonthData?.trafficPotential === 'very-high' && (
              <>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Apply early - positions fill fast during peak demand</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Be flexible with shifts - premium pay for nights/weekends</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Maintain high ratings to access the best opportunities</span>
                </li>
              </>
            )}
            {selectedMonthData?.trafficPotential === 'high' && (
              <>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Good time to try new industries and roles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Build relationships with employers for repeat work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Consider multi-day or recurring shifts</span>
                </li>
              </>
            )}
            {selectedMonthData?.trafficPotential === 'medium' && (
              <>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Focus on skill-building and certifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Perfect time to prepare for upcoming peak seasons</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Update your profile and availability settings</span>
                </li>
              </>
            )}
            {(!selectedMonthData?.trafficPotential || selectedMonthData?.trafficPotential === 'low') && (
              <>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Great time to get verified for new roles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Take training courses to expand your skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Build your rating with consistent quality work</span>
                </li>
              </>
            )}
          </ul>
          
          <Button className="w-full mt-6" asChild>
            <Link to="/career-hub/guides">
              View Career Guides
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HiringCalendar;
