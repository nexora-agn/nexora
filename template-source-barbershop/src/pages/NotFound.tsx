import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Scissors } from "lucide-react";
import Layout from "@template-barbershop/components/layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <section className="min-h-[70vh] flex items-center justify-center bg-[hsl(var(--primary))] text-white text-center px-6 pt-24">
        <div>
          <Scissors className="h-10 w-10 text-[hsl(var(--secondary))] mx-auto mb-6" />
          <p className="luxury-eyebrow mb-4">404</p>
          <h1 className="font-display text-4xl sm:text-5xl uppercase mb-5">This Chair's Empty</h1>
          <p className="text-white/60 max-w-md mx-auto mb-8">
            The page you're looking for has been moved or doesn't exist. Let's get you back to a fresh cut.
          </p>
          <Link to="/" className="btn-luxury-hero-primary">
            Back to Home
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
