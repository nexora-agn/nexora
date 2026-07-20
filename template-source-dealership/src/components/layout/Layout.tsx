import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Header from "./Header";
import Footer from "./Footer";
import FloatingCallButton from "./FloatingCallButton";

const Layout = ({ children, transparentHeader }: { children: ReactNode; transparentHeader?: boolean }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className={cn("flex-1 min-w-0", !transparentHeader && "pt-0")}>{children}</main>
    <Footer />
    <FloatingCallButton />
  </div>
);

export default Layout;
