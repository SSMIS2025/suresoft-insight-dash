import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import ResourceStatistics from "@/components/statistics/ResourceStatistics";
import LinearTVStatistics from "@/components/statistics/LinearTVStatistics";
import DeviceActionHistory from "@/components/statistics/DeviceActionHistory";

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
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Statistics</h1>
        <p className="text-muted-foreground">Detailed analytics and device statistics</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-card rounded-lg border">
        <div>
          <label className="text-sm font-medium mb-2 block">Province/Region</label>
          <Select value={province} onValueChange={setProvince}>
            <SelectTrigger>
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
            <SelectTrigger>
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
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fromDate ? format(fromDate, "PPP") : "Pick a date"}
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
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {toDate ? format(toDate, "PPP") : "Pick a date"}
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

      <Tabs defaultValue="resource" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resource">Resource Statistics</TabsTrigger>
          <TabsTrigger value="linear-tv">Linear TV Statistics</TabsTrigger>
          <TabsTrigger value="device-history">Device Action History</TabsTrigger>
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
