import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  ArrowLeft,
  Heart,
  Share2,
  Printer,
  X,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Fuel,
  Settings2,
  Hash,
  Barcode,
  GitCompare,
} from "lucide-react";
import Layout from "@template-dealership/components/layout/Layout";
import { PropertyCard } from "@template-dealership/components/home/FeaturedListings";
import { useSiteContent } from "@template-dealership/contexts/SiteContentContext";
import { useTheme } from "@template-dealership/contexts/ThemeContext";
import { toggleFavorite, isFavorite } from "@template-dealership/lib/favorites";
import { toggleCompare } from "@template-dealership/lib/propertyCompare";
import { calculateMortgage, formatCurrency } from "@template-dealership/lib/mortgageCalculator";
import { createLead } from "@template-dealership/lib/dealerLeads";
import type { VehicleListing } from "@template-dealership/data/inventory";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DealerField,
  DealerInput,
  DealerTextarea,
} from "@template-dealership/components/forms/DealerForm";

function listingTypeLabel(t: VehicleListing["listingType"]) {
  if (t === "new") return "New";
  if (t === "cpo") return "Certified";
  return "Used";
}

const PropertyDetail = () => {
  const { projects, team, company: COMPANY } = useSiteContent();
  const { resolveProjectImage } = useTheme();
  const { id } = useParams();
  const vehicle = projects.find(p => p.id === id) as VehicleListing | undefined;
  const [fav, setFav] = useState(() => (id ? isFavorite(id) : false));
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [downPayment, setDownPayment] = useState(10);
  const [interestRate, setInterestRate] = useState(6.9);
  const [termYears, setTermYears] = useState(6);
  const [leadSent, setLeadSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  if (!vehicle) {
    return (
      <Layout>
        <div className="py-32 text-center container-custom">
          <h1 className="font-display text-2xl">Vehicle not found</h1>
          <Link to="/inventory" className="text-[hsl(var(--secondary))] mt-4 inline-block">
            Back to inventory
          </Link>
        </div>
      </Layout>
    );
  }

  const gallery = vehicle.gallery?.length ? vehicle.gallery : [vehicle.image];
  const agent = team.find(a => a.id === vehicle.agentId);
  const similar = projects.filter(pr => {
    if (pr.id === vehicle.id) return false;
    const v = pr as VehicleListing;
    return v.category === vehicle.category || v.make === vehicle.make;
  }).slice(0, 3);
  const price = vehicle.price || 0;
  const msrp = vehicle.msrp || price;
  const discount = msrp > price ? msrp - price : 0;
  const mortgage = price > 5000 ? calculateMortgage({ price, downPaymentPercent: downPayment, interestRate, termYears }) : null;

  const handleEPrice = (e: React.FormEvent) => {
    e.preventDefault();
    createLead({
      type: "inquiry",
      name: form.name,
      email: form.email,
      phone: form.phone,
      vehicleId: vehicle.id,
      message: form.message || "E-Price request",
    });
    setLeadSent(true);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: vehicle.title,
    brand: vehicle.make,
    model: vehicle.model,
    vehicleModelDate: vehicle.year,
    mileageFromOdometer: { "@type": "QuantitativeValue", value: vehicle.mileage, unitCode: "SMI" },
    fuelType: vehicle.fuelType,
    vehicleTransmission: vehicle.transmission,
    driveWheelConfiguration: vehicle.drivetrain,
    color: vehicle.exteriorColor,
    vehicleIdentificationNumber: vehicle.vin,
    offers: {
      "@type": "Offer",
      price: vehicle.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <Layout>
      <Helmet>
        <title>
          {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim} | {COMPANY.name}
        </title>
        <meta name="description" content={vehicle.description} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="dealer-header-offset pb-8 sm:pb-10 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-1 h-[42vh] sm:h-[48vh] lg:h-[56vh] max-h-[480px] overflow-hidden isolate">
          <button
            type="button"
            className="lg:col-span-2 relative min-h-0 h-full w-full overflow-hidden group cursor-pointer"
            onClick={() => {
              setGalleryIdx(0);
              setGalleryOpen(true);
            }}
          >
            <img
              src={resolveProjectImage(vehicle.id, gallery[0])}
              alt=""
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </button>
          <div className="hidden lg:grid grid-rows-2 gap-1 lg:col-span-2 min-h-0 h-full">
            {gallery.slice(1, 3).map((src, i) => (
              <button
                key={i}
                type="button"
                className="relative min-h-0 overflow-hidden group"
                onClick={() => {
                  setGalleryIdx(i + 1);
                  setGalleryOpen(true);
                }}
              >
                <img
                  src={resolveProjectImage(vehicle.id, src)}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {i === 1 && gallery.length > 3 && (
                  <span className="absolute inset-0 z-10 bg-black/50 flex items-center justify-center text-white text-sm uppercase tracking-wider">
                    +{gallery.length - 3} Photos
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="container-custom container-inset py-10 sm:py-12 lg:py-14 relative z-10 bg-background">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <Link
                to="/inventory"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[hsl(var(--secondary))] mb-6"
              >
                <ArrowLeft className="h-4 w-4" /> Back to inventory
              </Link>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-3 py-1 bg-[hsl(var(--primary))] text-white text-[10px] uppercase tracking-wider">
                  {listingTypeLabel(vehicle.listingType)}
                </span>
                {vehicle.featured && (
                  <span className="px-3 py-1 bg-[hsl(var(--secondary))] text-white text-[10px] uppercase tracking-wider">
                    Featured
                  </span>
                )}
                <span className="px-3 py-1 border border-border text-[10px] uppercase tracking-wider">
                  Stock #{vehicle.stockNumber}
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl text-[hsl(var(--primary))] mb-2">{vehicle.title}</h1>
              <p className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin className="h-4 w-4" />
                {vehicle.location} · {vehicle.city}
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8 p-6 bg-[hsl(var(--muted))]/50 border border-border">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Dealer price</p>
                  <p className="font-display text-3xl text-[hsl(var(--secondary))]">{vehicle.priceLabel}</p>
                  {msrp > price && (
                    <p className="text-sm text-muted-foreground mt-1">
                      MSRP {formatCurrency(msrp)} · You save {formatCurrency(discount)}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Est. monthly</p>
                  <p className="font-display text-3xl text-[hsl(var(--primary))]">
                    {formatCurrency(vehicle.monthlyEstimate)}
                    <span className="text-base text-muted-foreground">/mo</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">With approved credit · See finance for details</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 py-6 border-y border-border mb-8 text-sm">
                <span className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-[hsl(var(--secondary))]" />
                  {vehicle.mileage.toLocaleString()} mi
                </span>
                <span className="flex items-center gap-2">
                  <Fuel className="h-4 w-4 text-[hsl(var(--secondary))]" />
                  {vehicle.fuelType}
                </span>
                <span className="flex items-center gap-2">
                  <Settings2 className="h-4 w-4 text-[hsl(var(--secondary))]" />
                  {vehicle.transmission}
                </span>
                <span className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-[hsl(var(--secondary))]" />
                  {vehicle.drivetrain}
                </span>
                <span className="flex items-center gap-2">
                  <Barcode className="h-4 w-4 text-[hsl(var(--secondary))]" />
                  VIN …{vehicle.vin.slice(-6)}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Specifications</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Engine: {vehicle.engine}</li>
                    <li>Exterior: {vehicle.exteriorColor}</li>
                    <li>Interior: {vehicle.interiorColor}</li>
                    <li>Body: {vehicle.propertyType}</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Warranty</p>
                  <p className="text-muted-foreground">{vehicle.warranty}</p>
                  {vehicle.videoUrl && (
                    <a href={vehicle.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-[hsl(var(--secondary))] uppercase text-xs tracking-wider">
                      Watch video
                    </a>
                  )}
                  {vehicle.virtualTourUrl && (
                    <a href={vehicle.virtualTourUrl} className="inline-block mt-2 text-[hsl(var(--secondary))] uppercase text-xs tracking-wider">
                      Virtual tour
                    </a>
                  )}
                </div>
              </div>

              <h2 className="luxury-subheading mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed mb-10">{vehicle.description}</p>

              {vehicle.features?.length > 0 && (
                <>
                  <h2 className="luxury-subheading mb-4">Features & equipment</h2>
                  <ul className="grid grid-cols-2 gap-2 mb-10 text-sm text-muted-foreground">
                    {vehicle.features.map(f => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[hsl(var(--secondary))] rounded-full" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {vehicle.options?.length > 0 && (
                <>
                  <h2 className="luxury-subheading mb-4">Options</h2>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {vehicle.options.map(o => (
                      <span key={o} className="px-3 py-1.5 bg-[hsl(var(--muted))] text-xs">
                        {o}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {mortgage && (
                <div className="border border-border p-6 mb-10">
                  <h2 className="luxury-subheading mb-6">Payment estimator</h2>
                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Down %</label>
                      <Input type="number" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} className="mt-1 rounded-none" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">APR %</label>
                      <Input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="mt-1 rounded-none" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Term (years)</label>
                      <Input type="number" value={termYears} onChange={e => setTermYears(Number(e.target.value))} className="mt-1 rounded-none" />
                    </div>
                  </div>
                  <p className="font-display text-3xl text-[hsl(var(--secondary))]">
                    {formatCurrency(mortgage.monthlyPayment)}
                    <span className="text-base text-muted-foreground">/month est.</span>
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Link to="/digital-retail" className="btn-luxury-hero-primary text-sm px-6 py-3">
                  Start digital purchase
                </Link>
                <Link to={`/test-drive?vehicle=${vehicle.id}`} className="btn-luxury-hero-secondary text-sm px-6 py-3">
                  Schedule test drive
                </Link>
              </div>
            </div>

            <aside id="e-price" className="lg:sticky lg:top-32 lg:self-start h-fit space-y-6 scroll-mt-28">
              <div className="border border-border p-6 bg-white shadow-sm">
                <div className="flex gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => setFav(toggleFavorite(vehicle.id).includes(vehicle.id))}
                    className="flex-1 h-10 border border-border flex items-center justify-center gap-2 text-xs uppercase tracking-wider hover:border-[hsl(var(--secondary))]"
                  >
                    <Heart className={cn("h-4 w-4", fav && "fill-red-500 text-red-500")} /> Save
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCompare(vehicle.id)}
                    className="flex-1 h-10 border border-border flex items-center justify-center gap-2 text-xs uppercase tracking-wider hover:border-[hsl(var(--secondary))]"
                  >
                    <GitCompare className="h-4 w-4" /> Compare
                  </button>
                  <button type="button" onClick={() => window.print()} className="h-10 w-10 border border-border flex items-center justify-center hover:border-[hsl(var(--secondary))]">
                    <Printer className="h-4 w-4" />
                  </button>
                  <button type="button" className="h-10 w-10 border border-border flex items-center justify-center hover:border-[hsl(var(--secondary))]">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2 mb-6">
                  <Button asChild className="rounded-none w-full h-11 uppercase text-xs tracking-wider bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/90">
                    <Link to={`/test-drive?vehicle=${vehicle.id}`}>Schedule test drive</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-none w-full h-11 uppercase text-xs tracking-wider">
                    <Link to="/finance">Apply for financing</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-none w-full h-11 uppercase text-xs tracking-wider">
                    <Link to="/value-your-trade">Value my trade</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-none w-full h-11 uppercase text-xs tracking-wider">
                    <a href={`tel:${COMPANY.phone.replace(/[^+\d]/g, "")}`}>Call now</a>
                  </Button>
                </div>

                {agent && (
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                    <img src={agent.image} alt="" className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <p className="font-display text-lg">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.role}</p>
                      <Link to={`/team/${agent.id}`} className="text-xs text-[hsl(var(--secondary))] uppercase tracking-wider mt-1 inline-block">
                        Contact
                      </Link>
                    </div>
                  </div>
                )}

                {leadSent ? (
                  <p className="text-sm text-[hsl(var(--secondary))]">Thank you — we&apos;ll send your personalized price shortly.</p>
                ) : (
                  <form className="space-y-4" onSubmit={handleEPrice}>
                    <p className="font-display text-xl">Get e-price</p>
                    <DealerField label="Name" htmlFor="ep-name">
                      <DealerInput id="ep-name" placeholder="Your name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </DealerField>
                    <DealerField label="Email" htmlFor="ep-email">
                      <DealerInput id="ep-email" type="email" placeholder="Email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </DealerField>
                    <DealerField label="Phone" htmlFor="ep-phone">
                      <DealerInput id="ep-phone" type="tel" placeholder="Phone" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                    </DealerField>
                    <DealerField label="Questions" htmlFor="ep-msg">
                      <DealerTextarea
                        id="ep-msg"
                        placeholder="Optional"
                        rows={3}
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      />
                    </DealerField>
                    <Button type="submit" className="w-full rounded-none bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] uppercase text-xs tracking-wider h-12">
                      Get e-price
                    </Button>
                  </form>
                )}
              </div>
            </aside>
          </div>

          {similar.length > 0 && (
            <div className="mt-20">
              <h2 className="luxury-subheading mb-8">Similar vehicles</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {similar.map(l => (
                  <PropertyCard key={l.id} listing={l} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {galleryOpen && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
          <button type="button" className="absolute top-6 right-6 text-white p-2" onClick={() => setGalleryOpen(false)} aria-label="Close">
            <X className="h-8 w-8" />
          </button>
          <button type="button" className="absolute left-4 text-white p-2" onClick={() => setGalleryIdx(i => (i - 1 + gallery.length) % gallery.length)} aria-label="Previous">
            <ChevronLeft className="h-8 w-8" />
          </button>
          <img src={resolveProjectImage(vehicle.id, gallery[galleryIdx])} alt="" className="max-h-[90vh] max-w-[90vw] object-contain" />
          <button type="button" className="absolute right-4 text-white p-2" onClick={() => setGalleryIdx(i => (i + 1) % gallery.length)} aria-label="Next">
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </Layout>
  );
};

export default PropertyDetail;
