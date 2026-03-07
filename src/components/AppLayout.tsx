import AppNavbar from "@/components/AppNavbar";
import Footer from "@/components/landing/Footer";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <AppNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
