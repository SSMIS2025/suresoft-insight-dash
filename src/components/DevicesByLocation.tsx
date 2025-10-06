import { useState } from "react";
import { ChevronRight, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationNode {
  name: string;
  count: number;
  children?: LocationNode[];
}

const locationData: LocationNode[] = [
  {
    name: "India",
    count: 1100,
    children: [
      {
        name: "Tamil Nadu",
        count: 450,
        children: [
          { name: "Tirunelveli", count: 150 },
          { name: "Madurai", count: 180 },
          { name: "Tenkasi", count: 120 },
        ],
      },
      {
        name: "Kerala",
        count: 350,
        children: [
          { name: "Thiruvananthapuram", count: 180 },
          { name: "Kochi", count: 170 },
        ],
      },
      {
        name: "Andhra Pradesh",
        count: 300,
        children: [
          { name: "Visakhapatnam", count: 150 },
          { name: "Vijayawada", count: 150 },
        ],
      },
    ],
  },
  {
    name: "Outside India",
    count: 134,
    children: [
      { name: "USA", count: 50 },
      { name: "UK", count: 40 },
      { name: "UAE", count: 44 },
    ],
  },
];

const LocationNode = ({ node, level = 0 }: { node: LocationNode; level?: number }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={`${level > 0 ? "ml-6" : ""}`}>
      <div className="flex items-center gap-2 py-2 hover:bg-muted/50 rounded-lg px-2 transition-colors">
        {hasChildren ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <div className="w-6" />
        )}
        <MapPin className="h-4 w-4 text-primary" />
        <span className="font-medium flex-1">{node.name}</span>
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
          {node.count}
        </span>
      </div>
      {hasChildren && isExpanded && (
        <div className="border-l-2 border-border ml-3">
          {node.children!.map((child, index) => (
            <LocationNode key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const DevicesByLocation = () => {
  return (
    <div className="space-y-2">
      {locationData.map((location, index) => (
        <LocationNode key={index} node={location} />
      ))}
    </div>
  );
};

export default DevicesByLocation;
