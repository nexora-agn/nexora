import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingBookingButton from "./FloatingBookingButton";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 page-transition-enter">{children}</main>
      <Footer />
      <FloatingBookingButton />
    </div>
  );
};

export default Layout;
