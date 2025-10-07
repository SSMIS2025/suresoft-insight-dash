import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import ResourceStatistics from "@/components/statistics/ResourceStatistics";
import LinearTVStatistics from "@/components/statistics/LinearTVStatistics";
import DeviceActionHistory from "@/components/statistics/DeviceActionHistory";

const formatDateDisplay = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);
  return `${day}${month}${year}`;
};

const Statistics = () => {
  const [province, setProvince] = useState("all");
  const [timePeriod, setTimePeriod] = useState("daily");
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());

  const handleTimePeriodChange = (value: string) => {
    setTimePeriod(value);
    const today = new Date();
    const newFromDate = new Date();
    
    switch(value) {
      case "daily":
        setFromDate(today);
        setToDate(today);
        break;
      case "weekly":
        newFromDate.setDate(today.getDate() - 7);
        setFromDate(newFromDate);
        setToDate(today);
        break;
      case "monthly":
        newFromDate.setMonth(today.getMonth() - 1);
        setFromDate(newFromDate);
        setToDate(today);
        break;
      case "yearly":
        newFromDate.setFullYear(today.getFullYear() - 1);
        setFromDate(newFromDate);
        setToDate(today);
        break;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in p-6">
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 rounded-xl border-2 border-primary/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Statistics Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">Comprehensive analytics and device insights</p>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-card via-primary/5 to-accent/5 rounded-xl border-2 border-primary/30 shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-primary">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Province/Region</label>
            <Select value={province} onValueChange={setProvince}>
              <SelectTrigger className="border-primary/30 focus:ring-primary">
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                <SelectItem value="kerala">Kerala</SelectItem>
                <SelectItem value="andhra">Andhra Pradesh</SelectItem>
                <SelectItem value="karnataka">Karnataka</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Time Period</label>
            <Select value={timePeriod} onValueChange={handleTimePeriodChange}>
              <SelectTrigger className="border-primary/30 focus:ring-primary">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">From Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal border-primary/30">
                  <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                  {fromDate ? formatDateDisplay(fromDate) : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={(date) => date && setFromDate(date)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">To Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal border-primary/30">
                  <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                  {toDate ? formatDateDisplay(toDate) : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={(date) => date && setToDate(date)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg">
            <Filter className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="resource" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-primary/10 to-accent/10 p-1 h-auto">
          <TabsTrigger 
            value="resource"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white"
          >
            Resource Statistics
          </TabsTrigger>
          <TabsTrigger 
            value="linear-tv"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white"
          >
            Linear TV Statistics
          </TabsTrigger>
          <TabsTrigger 
            value="device-history"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white"
          >
            Device Action History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="resource" className="mt-6">
          <ResourceStatistics />
        </TabsContent>
        
        <TabsContent value="linear-tv" className="mt-6">
          <LinearTVStatistics />
        </TabsContent>
        
        <TabsContent value="device-history" className="mt-6">
          <DeviceActionHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;
