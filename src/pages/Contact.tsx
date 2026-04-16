import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Get in touch</h1>
            <p className="text-muted-foreground mb-10">
              Have a question or want to learn more? We'd love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">hello@webready.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 000-0000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Office</p>
                  <p className="text-sm text-muted-foreground">123 Web Street, Internet City</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <CheckCircle2 size={48} className="text-foreground mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Message sent!</h3>
                <p className="text-sm text-muted-foreground">We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Your name *" required className="h-12 rounded-xl" />
                <Input type="email" placeholder="Email address *" required className="h-12 rounded-xl" />
                <Input placeholder="Subject" className="h-12 rounded-xl" />
                <Textarea placeholder="Your message *" required className="rounded-xl min-h-[140px] resize-none" />
                <Button type="submit" className="w-full h-12 rounded-xl text-base">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
