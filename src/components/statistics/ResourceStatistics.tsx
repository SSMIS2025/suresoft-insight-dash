import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download } from "lucide-react";
import { format, addDays } from "date-fns";
import * as XLSX from "xlsx";
import { useToast } from "@/hooks/use-toast";

const ResourceStatistics = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: addDays(new Date(), 6),
  });

  const categories = ["Video", "Audio", "Documents", "Images", "Applications"];
  
  const generateWeekData = () => {
    const data = [];
    const currentDate = new Date(dateRange.from);
    
    while (currentDate <= dateRange.to) {
      data.push({
        date: format(currentDate, "dd MMM yy"),
        values: categories.map(() => Math.floor(Math.random() * 100) + 20),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return data;
  };

  const weekData = generateWeekData();

  const exportToExcel = () => {
    const data = categories.map((category, index) => {
      const row: any = { Category: category };
      weekData.forEach((day) => {
        row[day.date] = day.values[index];
      });
      return row;
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Resource Statistics");
    XLSX.writeFile(wb, "resource_statistics.xlsx");
    
    toast({
      title: "Export Successful",
      description: "Resource statistics exported to Excel",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Resource Statistics</CardTitle>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateRange.from}
                  onSelect={(date) => date && setDateRange({ from: date, to: addDays(date, 6) })}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <Button size="sm" onClick={exportToExcel}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-semibold">Category</th>
                {weekData.map((day) => (
                  <th key={day.date} className="text-center p-3 font-semibold">
                    {day.date}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium">{category}</td>
                  {weekData.map((day) => (
                    <td key={day.date} className="text-center p-3">
                      {day.values[index]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceStatistics;
