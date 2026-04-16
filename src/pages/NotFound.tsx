import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <span className="text-8xl font-bold text-foreground">404</span>
        <h1 className="text-2xl font-bold text-foreground mt-4 mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="rounded-full px-6 gap-2">
          <Link to="/">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
