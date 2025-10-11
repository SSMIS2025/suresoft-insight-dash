import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, BarChart3, Monitor, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  if (location.pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-xl font-bold text-white">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">SRMS</h1>
              <p className="text-xs text-muted-foreground">Remote Management System</p>
            </div>
          </div>
          
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {localStorage.getItem("username")}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 border-r bg-card">
          <nav className="flex flex-col gap-2 p-4">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              className="justify-start"
              onClick={() => navigate("/")}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <Button
              variant={isActive("/statistics") ? "default" : "ghost"}
              className="justify-start"
              onClick={() => navigate("/statistics")}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Statistics
            </Button>
            <Button
              variant={isActive("/devices") ? "default" : "ghost"}
              className="justify-start"
              onClick={() => navigate("/devices")}
            >
              <Monitor className="h-4 w-4 mr-2" />
              Devices
            </Button>
            <Button
              variant={isActive("/management") ? "default" : "ghost"}
              className="justify-start"
              onClick={() => navigate("/management")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Management
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
