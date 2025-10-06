import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const ActivationChart = () => {
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
    colors: ["#6366f1"],
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
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(dateRange.from, "MMM dd, yyyy")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateRange.from}
              onSelect={(date) => date && setDateRange({ ...dateRange, from: date })}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(dateRange.to, "MMM dd, yyyy")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateRange.to}
              onSelect={(date) => date && setDateRange({ ...dateRange, to: date })}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ActivationChart;
