import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
}

const StatCard = ({ title, value, icon: Icon, gradient }: StatCardProps) => {
  return (
    <Card className="overflow-hidden card-hover">
      <CardContent className="p-0">
        <div className={`${gradient} p-4 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{title}</p>
              <p className="text-3xl font-bold mt-1">{value}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Icon className="h-8 w-8" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
