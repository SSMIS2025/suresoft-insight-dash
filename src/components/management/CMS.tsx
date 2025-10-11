import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, Plus, Download, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

const CMS = () => {
  const [activeTab, setActiveTab] = useState("bulk-provisioning");
  const [showBootAdModal, setShowBootAdModal] = useState(false);

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bulk-provisioning">Bulk Provisioning</TabsTrigger>
          <TabsTrigger value="boot-ad">Boot Ad Files</TabsTrigger>
          <TabsTrigger value="metadata-sets">Metadata Sets</TabsTrigger>
          <TabsTrigger value="metadata-log">Metadata File Log</TabsTrigger>
        </TabsList>

        <TabsContent value="bulk-provisioning">
          <BulkProvisioning />
        </TabsContent>

        <TabsContent value="boot-ad">
          <BootAdFiles onAddClick={() => setShowBootAdModal(true)} />
        </TabsContent>

        <TabsContent value="metadata-sets">
          <MetadataSets />
        </TabsContent>

        <TabsContent value="metadata-log">
          <MetadataFileLog />
        </TabsContent>
      </Tabs>

      <Dialog open={showBootAdModal} onOpenChange={setShowBootAdModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Boot Ad</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Ad Name</Label>
              <Input placeholder="Enter ad name" />
            </div>
            <div className="space-y-2">
              <Label>Boot Ad File</Label>
              <Input type="file" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBootAdModal(false)}>Cancel</Button>
            <Button onClick={() => setShowBootAdModal(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const BulkProvisioning = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="font-semibold">Landing Channel</CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>Channel Name: <span className="font-semibold">StarPlus HD</span></div>
            <div>Number: <span className="font-semibold">101</span></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="font-semibold">Boot Ad</CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>Ad Name: <span className="font-semibold">Welcome Ad</span></div>
            <div>Version: <span className="font-semibold">v1.2.0</span></div>
            <div>File Name: <span className="font-semibold">welcome_ad.mp4</span></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="font-semibold">Metadata Set</CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>Name: <span className="font-semibold">Primary Set</span></div>
            <div>Version: <span className="font-semibold">v2.1.0</span></div>
            <div>Size: <span className="font-semibold">45.2 MB</span></div>
            <div>Created: <span className="font-semibold">15Oct25</span></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const BootAdFiles = ({ onAddClick }: any) => {
  const mockData = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    adName: `Boot Ad ${i + 1}`,
    fileName: `boot_ad_${i + 1}.mp4`,
    fileSize: `${(Math.random() * 50 + 10).toFixed(1)} MB`,
    version: `v1.${i}.0`,
    type: i % 2 === 0 ? "Video" : "Image",
    dateAdded: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}Oct25`,
  }));

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Boot Ad Files</h3>
        <Button onClick={onAddClick}>Add Boot Ad</Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ad Name</TableHead>
              <TableHead>File Name</TableHead>
              <TableHead>File Size</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.adName}</TableCell>
                <TableCell>{item.fileName}</TableCell>
                <TableCell>{item.fileSize}</TableCell>
                <TableCell>{item.version}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.dateAdded}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

const MetadataSets = () => {
  const mockBannerAds = Array.from({ length: 5 }, (_, i) => ({
    name: `Banner ${i + 1}`,
    type: "Image",
    fileSize: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
  }));

  const mockTVChannels = Array.from({ length: 8 }, (_, i) => ({
    name: `TV Channel ${i + 1}`,
    fileSize: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
    lcn: 100 + i,
  }));

  const mockRadioChannels = Array.from({ length: 6 }, (_, i) => ({
    name: `Radio Channel ${i + 1}`,
    fileSize: `${(Math.random() * 1 + 0.3).toFixed(1)} MB`,
    lcn: 200 + i,
  }));

  const mockVOD = Array.from({ length: 4 }, (_, i) => ({
    title: `VOD Content ${i + 1}`,
    fileSize: `${(Math.random() * 500 + 100).toFixed(0)} MB`,
    duration: `${Math.floor(Math.random() * 60 + 30)} min`,
    vodId: `VOD${1000 + i}`,
  }));

  const mockMetadataSets = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Metadata Set ${i + 1}`,
    version: `v${i + 1}.0.0`,
    fileSize: `${(Math.random() * 100 + 20).toFixed(1)} MB`,
    dateCreated: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}Oct25`,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <span className="font-semibold">Banner Ads</span>
            <Button variant="ghost" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Name</TableHead>
                    <TableHead className="text-xs">Type</TableHead>
                    <TableHead className="text-xs">Size</TableHead>
                    <TableHead className="text-xs">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBannerAds.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-xs">{item.name}</TableCell>
                      <TableCell className="text-xs">{item.type}</TableCell>
                      <TableCell className="text-xs">{item.fileSize}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ImageIcon className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
            <Button className="w-full mt-2" size="sm">Save</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <span className="font-semibold">TV Channel List</span>
            <Button variant="ghost" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Name</TableHead>
                    <TableHead className="text-xs">Size</TableHead>
                    <TableHead className="text-xs">LCN</TableHead>
                    <TableHead className="text-xs">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTVChannels.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-xs">{item.name}</TableCell>
                      <TableCell className="text-xs">{item.fileSize}</TableCell>
                      <TableCell className="text-xs">{item.lcn}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ImageIcon className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
            <Button className="w-full mt-2" size="sm">Save</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <span className="font-semibold">Radio Channel List</span>
            <Button variant="ghost" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Name</TableHead>
                    <TableHead className="text-xs">Size</TableHead>
                    <TableHead className="text-xs">LCN</TableHead>
                    <TableHead className="text-xs">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRadioChannels.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-xs">{item.name}</TableCell>
                      <TableCell className="text-xs">{item.fileSize}</TableCell>
                      <TableCell className="text-xs">{item.lcn}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ImageIcon className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
            <Button className="w-full mt-2" size="sm">Save</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <span className="font-semibold">Online (VOD)</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm">SET</Button>
              <Button variant="ghost" size="sm">GET</Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Title</TableHead>
                    <TableHead className="text-xs">Size</TableHead>
                    <TableHead className="text-xs">Duration</TableHead>
                    <TableHead className="text-xs">VOD ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockVOD.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-xs">{item.title}</TableCell>
                      <TableCell className="text-xs">{item.fileSize}</TableCell>
                      <TableCell className="text-xs">{item.duration}</TableCell>
                      <TableCell className="text-xs">{item.vodId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button size="lg">Create Metadata Set</Button>
      </div>

      <Card className="p-6">
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metadata Set Name</TableHead>
                <TableHead>File Version</TableHead>
                <TableHead>File Size</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMetadataSets.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.version}</TableCell>
                  <TableCell>{item.fileSize}</TableCell>
                  <TableCell>{item.dateCreated}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

const MetadataFileLog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const mockData = Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    metadataName: `Metadata ${i + 1}`,
    version: `v${i % 5 + 1}.${i % 10}.0`,
    steps: Math.floor(Math.random() * 5) + 1,
    messages: i % 3 === 0 ? "Success" : i % 3 === 1 ? "Warning" : "Processing",
    createTime: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}Oct25 ${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
  }));

  const filteredData = searchTerm ? mockData.filter((item) => 
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  ) : mockData;

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
            <span className="font-semibold">{mockData.length}</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Searched: </span>
            <span className="font-semibold">{filteredData.length}</span>
          </div>
        </div>
        <div className="flex gap-2">
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
              <TableHead>Metadata Name</TableHead>
              <TableHead>Metadata Version</TableHead>
              <TableHead>Steps</TableHead>
              <TableHead>Messages</TableHead>
              <TableHead>Create Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.metadataName}</TableCell>
                <TableCell>{item.version}</TableCell>
                <TableCell>{item.steps}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.messages === "Success" ? "bg-green-100 text-green-700" :
                    item.messages === "Warning" ? "bg-yellow-100 text-yellow-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>
                    {item.messages}
                  </span>
                </TableCell>
                <TableCell>{item.createTime}</TableCell>
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
    </Card>
  );
};

export default CMS;
