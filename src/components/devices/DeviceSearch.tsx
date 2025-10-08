import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface DeviceSearchProps {
  onClose: () => void;
  onSearch: (filters: any) => void;
}

const DeviceSearch = ({ onClose, onSearch }: DeviceSearchProps) => {
  const [filters, setFilters] = useState({
    stbId: "",
    province: "",
    cityTown: "",
    casActivation: "",
    model: "",
    fwVersion: "",
    customerId: "",
    retailer: "",
    manufacturer: "",
    locationIP: "",
    onlineStatus: "",
    srmsActivated: "",
  });

  const handleSearch = () => {
    onSearch(filters);
    onClose();
  };

  const handleClear = () => {
    setFilters({
      stbId: "",
      province: "",
      cityTown: "",
      casActivation: "",
      model: "",
      fwVersion: "",
      customerId: "",
      retailer: "",
      manufacturer: "",
      locationIP: "",
      onlineStatus: "",
      srmsActivated: "",
    });
    onSearch({});
  };

  return (
    <div className="bg-gradient-to-br from-card via-primary/5 to-accent/5 rounded-xl border-2 border-primary/30 shadow-lg p-6 animate-slide-down">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-primary">Advanced Search</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">STB ID</label>
          <Input
            placeholder="Enter STB ID"
            value={filters.stbId}
            onChange={(e) => setFilters({ ...filters, stbId: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Province</label>
          <Select value={filters.province} onValueChange={(val) => setFilters({ ...filters, province: val })}>
            <SelectTrigger>
              <SelectValue placeholder="Select province" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
              <SelectItem value="kerala">Kerala</SelectItem>
              <SelectItem value="andhra">Andhra Pradesh</SelectItem>
              <SelectItem value="karnataka">Karnataka</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">City/Town</label>
          <Input
            placeholder="Enter city"
            value={filters.cityTown}
            onChange={(e) => setFilters({ ...filters, cityTown: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">CAS Activation</label>
          <Select value={filters.casActivation} onValueChange={(val) => setFilters({ ...filters, casActivation: val })}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Model</label>
          <Input
            placeholder="Enter model"
            value={filters.model}
            onChange={(e) => setFilters({ ...filters, model: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">FW Version</label>
          <Input
            placeholder="Enter version"
            value={filters.fwVersion}
            onChange={(e) => setFilters({ ...filters, fwVersion: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Customer ID</label>
          <Input
            placeholder="Enter customer ID"
            value={filters.customerId}
            onChange={(e) => setFilters({ ...filters, customerId: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Retailer</label>
          <Input
            placeholder="Enter retailer"
            value={filters.retailer}
            onChange={(e) => setFilters({ ...filters, retailer: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Manufacturer</label>
          <Input
            placeholder="Enter manufacturer"
            value={filters.manufacturer}
            onChange={(e) => setFilters({ ...filters, manufacturer: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Location IP</label>
          <Input
            placeholder="Enter IP"
            value={filters.locationIP}
            onChange={(e) => setFilters({ ...filters, locationIP: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Online Status</label>
          <Select value={filters.onlineStatus} onValueChange={(val) => setFilters({ ...filters, onlineStatus: val })}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">SRMS Activated</label>
          <Select value={filters.srmsActivated} onValueChange={(val) => setFilters({ ...filters, srmsActivated: val })}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" onClick={handleClear}>
          Clear All
        </Button>
        <Button onClick={handleSearch} className="bg-gradient-to-r from-primary to-secondary">
          Apply Search
        </Button>
      </div>
    </div>
  );
};

export default DeviceSearch;
