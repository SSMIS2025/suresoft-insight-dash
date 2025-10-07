import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const formatDateDisplay = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);
  return `${day}${month}${year}`;
};

const ActivationChart = () => {
  const [province, setProvince] = useState("all");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 0, 31),
  });

  const generateData = () => {
    const days = [];
    const values = [];
    const currentDate = new Date(dateRange.from);
    
    while (currentDate <= dateRange.to) {
      days.push(format(currentDate, "MMM dd"));
      values.push(Math.floor(Math.random() * 50) + 10);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return { days, values };
  };

  const data = generateData();

  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "60%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["hsl(var(--chart-1))"],
    xaxis: {
      categories: data.days,
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: "Number of Devices",
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  const series = [
    {
      name: "Devices Activated",
      data: data.values,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Select value={province} onValueChange={setProvince}>
          <SelectTrigger className="w-[200px] border-primary/30">
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
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-left border-primary/30">
              <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
              {dateRange.from && dateRange.to
                ? `${formatDateDisplay(dateRange.from)} - ${formatDateDisplay(dateRange.to)}`
                : "Select date range"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={{ from: dateRange.from, to: dateRange.to }}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  setDateRange({ from: range.from, to: range.to });
                }
              }}
              disabled={(date) => date > new Date()}
              initialFocus
              className="pointer-events-auto"
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ActivationChart;
