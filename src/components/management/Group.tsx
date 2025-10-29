import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FileSpreadsheet, Search, Edit, Trash2, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

// Mock data
const mockLocationBased = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  location: `Location ${i + 1}`,
  devices: Math.floor(Math.random() * 100) + 10,
  landingChannel: `Channel ${i + 1}`,
  bootAd: `Ad ${i + 1}`,
  description: `Description for location ${i + 1}`,
  dateModified: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}Oct25`,
}));

const mockUserDefined = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Group ${i + 1}`,
  devices: Math.floor(Math.random() * 50) + 5,
  description: `User defined group ${i + 1}`,
  dateModified: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}Oct25`,
}));

const Group = () => {
  const [activeTab, setActiveTab] = useState("location-based");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [locationBasedData, setLocationBasedData] = useState(mockLocationBased);
  const [userDefinedData, setUserDefinedData] = useState(mockUserDefined);

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="location-based">Location Based</TabsTrigger>
          <TabsTrigger value="user-defined">User Defined</TabsTrigger>
        </TabsList>

        <TabsContent value="location-based">
          <GroupTable data={locationBasedData} setData={setLocationBasedData} type="location" />
        </TabsContent>

        <TabsContent value="user-defined">
          <GroupTable data={userDefinedData} setData={setUserDefinedData} type="user-defined" onCreateClick={() => setShowCreateModal(true)} />
        </TabsContent>
      </Tabs>

      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Group</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Group Name</Label>
              <Input value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Enter group name" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>Cancel</Button>
            <Button onClick={() => { setShowCreateModal(false); setGroupName(""); setDescription(""); }}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const GroupTable = ({ data, setData, type, onCreateClick }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();

  const filteredData = searchTerm ? data.filter((item: any) => 
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  ) : data;

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, type === "location" ? "Location Based" : "User Defined");
    XLSX.writeFile(workbook, `${type === "location" ? "location_based" : "user_defined"}_groups.xlsx`);
    toast({ title: "Export Successful", description: "Groups data exported successfully" });
  };

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setData(data.map((d: any) => d.id === editingItem.id ? editingItem : d));
    toast({ title: "Success", description: "Group updated successfully" });
    setShowEditModal(false);
    setEditingItem(null);
  };

  const handleDelete = (itemId: number) => {
    setData(data.filter((d: any) => d.id !== itemId));
    toast({ title: "Success", description: "Group deleted successfully" });
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-6">
          <div>
            <span className="text-sm text-muted-foreground">Total: </span>
            <span className="font-semibold">{data.length}</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Searched: </span>
            <span className="font-semibold">{filteredData.length}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleExport} title="Export">
            <FileSpreadsheet className="h-4 w-4" />
          </Button>
          {type === "user-defined" && (
            <Button variant="outline" size="icon" onClick={onCreateClick}>
              <Plus className="h-4 w-4" />
            </Button>
          )}
          <Button variant="outline" size="icon" onClick={() => setShowSearch(!showSearch)}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showSearch && (
        <div className="mb-4">
          <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {type === "location" && <TableHead className="w-12"><Checkbox /></TableHead>}
              {type === "location" && <TableHead>Location</TableHead>}
              {type === "user-defined" && <TableHead>Name</TableHead>}
              <TableHead>Devices</TableHead>
              {type === "location" && (
                <>
                  <TableHead>Landing Channel</TableHead>
                  <TableHead>Boot Ad</TableHead>
                </>
              )}
              <TableHead>Description</TableHead>
              <TableHead>Date Modified</TableHead>
              {type === "user-defined" && <TableHead className="text-right">Action</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item: any) => (
              <TableRow key={item.id}>
                {type === "location" && (
                  <TableCell><Checkbox /></TableCell>
                )}
                <TableCell>{type === "location" ? item.location : item.name}</TableCell>
                <TableCell>{item.devices}</TableCell>
                {type === "location" && (
                  <>
                    <TableCell>{item.landingChannel}</TableCell>
                    <TableCell>{item.bootAd}</TableCell>
                  </>
                )}
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.dateModified}</TableCell>
                {type === "user-defined" && (
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <Select value={itemsPerPage.toString()} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">entries</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
            Previous
          </Button>
          {getPageNumbers().map((page, idx) => (
            page === "..." ? (
              <span key={idx} className="px-2">...</span>
            ) : (
              <Button key={idx} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page as number)}>
                {page}
              </Button>
            )
          ))}
          <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
            Next
          </Button>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm text-muted-foreground">Go to:</span>
            <Input type="number" className="w-16" min={1} max={totalPages} onChange={(e) => { const p = Number(e.target.value); if (p >= 1 && p <= totalPages) setCurrentPage(p); }} />
          </div>
        </div>
      </div>

      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Group</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{type === "location" ? "Location" : "Name"}</Label>
              <Input 
                value={type === "location" ? editingItem?.location || "" : editingItem?.name || ""} 
                onChange={(e) => setEditingItem({ ...editingItem, [type === "location" ? "location" : "name"]: e.target.value })} 
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input value={editingItem?.description || ""} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} />
            </div>
            {type === "location" && (
              <>
                <div className="space-y-2">
                  <Label>Landing Channel</Label>
                  <Input value={editingItem?.landingChannel || ""} onChange={(e) => setEditingItem({ ...editingItem, landingChannel: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Boot Ad</Label>
                  <Input value={editingItem?.bootAd || ""} onChange={(e) => setEditingItem({ ...editingItem, bootAd: e.target.value })} />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Group;
