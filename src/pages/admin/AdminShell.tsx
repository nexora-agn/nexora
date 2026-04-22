import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutGrid, LogOut, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import type { ReactNode } from "react";

export const AdminShell = ({ children, rightSlot }: { children: ReactNode; rightSlot?: ReactNode }) => {
  const { profile, user, signOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onLogout = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b bg-card sticky top-0 z-40">
        <div className="flex items-center gap-4 px-4 sm:px-6 h-14">
          <Link to="/admin/clients" className="font-bold tracking-tight text-base">
            Nexora <span className="text-muted-foreground font-medium">admin</span>
          </Link>

          <nav className="ml-4 hidden sm:flex items-center gap-1 text-sm">
            <Link
              to="/admin/clients"
              className={`px-3 py-1.5 rounded-md inline-flex items-center gap-2 ${
                pathname.startsWith("/admin/clients")
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              Clients
            </Link>
            <Link
              to="/admin/requests"
              className={`px-3 py-1.5 rounded-md inline-flex items-center gap-2 ${
                pathname.startsWith("/admin/requests")
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              Requests
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            {rightSlot}
            <div className="text-right hidden sm:block leading-tight">
              <div className="text-sm font-medium">{profile?.full_name ?? user?.email}</div>
              <div className="text-xs text-muted-foreground capitalize">{profile?.role ?? "sales"}</div>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-1.5" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminShell;
