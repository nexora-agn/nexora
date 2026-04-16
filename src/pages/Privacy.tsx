import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-8">Privacy Policy</h1>

        <div className="prose-sm text-muted-foreground space-y-6 leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

          <h2 className="text-lg font-semibold text-foreground pt-4">1. Information We Collect</h2>
          <p>We collect information you provide directly, such as your name, email address, company name, and phone number when you request a demo or contact us.</p>

          <h2 className="text-lg font-semibold text-foreground pt-4">2. How We Use Your Information</h2>
          <p>We use the information to provide our services, communicate with you, improve our offerings, and send relevant updates if you've opted in.</p>

          <h2 className="text-lg font-semibold text-foreground pt-4">3. Data Sharing</h2>
          <p>We do not sell your personal data. We may share information with trusted service providers who assist us in operating our platform.</p>

          <h2 className="text-lg font-semibold text-foreground pt-4">4. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.</p>

          <h2 className="text-lg font-semibold text-foreground pt-4">5. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information at any time by contacting us.</p>

          <h2 className="text-lg font-semibold text-foreground pt-4">6. Contact</h2>
          <p>If you have questions about this policy, please reach out via our <Link to="/contact" className="text-foreground underline">contact page</Link>.</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
