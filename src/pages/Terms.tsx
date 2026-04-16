import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-8">Terms of Service</h1>

        <div className="prose-sm text-muted-foreground space-y-6 leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

          <h2 className="text-lg font-semibold text-foreground pt-4">1. Services</h2>
          <p>Webready provides website design and development services. By using our services, you agree to these terms.</p>

          <h2 className="text-lg font-semibold text-foreground pt-4">2. Ordering Process</h2>
          <p>When you submit a request, we will review your requirements and provide a timeline. Work begins upon confirmation.</p>

          <h2 className="text-lg font-semibold text-foreground pt-4">3. Delivery</h2>
          <p>We aim to deliver your website within the agreed timeline. Delays caused by incomplete information from the client may extend delivery time.</p>

          <h2 className="text-lg font-semibold text-foreground pt-4">4. Intellectual Property</h2>
          <p>Upon full payment, all website content and design created by Webready becomes your property.</p>

          <h2 className="text-lg font-semibold text-foreground pt-4">5. Limitation of Liability</h2>
          <p>Webready is not liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>

          <h2 className="text-lg font-semibold text-foreground pt-4">6. Changes</h2>
          <p>We reserve the right to update these terms at any time. Continued use of our services constitutes acceptance of updated terms.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
