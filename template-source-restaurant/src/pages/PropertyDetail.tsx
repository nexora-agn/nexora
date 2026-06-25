import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import {
  MapPin, Bed, Bath, Car, Maximize, ArrowLeft, Heart, Share2, Printer,
  X, ChevronLeft, ChevronRight, FileText, Zap,
} from "lucide-react";
import Layout from "@template-restaurant/components/layout/Layout";
import { PropertyCard } from "@template-restaurant/components/home/FeaturedListings";
import { useSiteContent } from "@template-restaurant/contexts/SiteContentContext";
import { useTheme } from "@template-restaurant/contexts/ThemeContext";
import { toggleFavorite, isFavorite } from "@template-restaurant/lib/favorites";
import { calculateMortgage, formatCurrency } from "@template-restaurant/lib/mortgageCalculator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PropertyDetail = () => {
  const { projects, team, company: COMPANY } = useSiteContent();
  const { resolveProjectImage } = useTheme();
  const { id } = useParams();
  const property = projects.find(p => p.id === id);
  const [fav, setFav] = useState(() => (id ? isFavorite(id) : false));
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);

  if (!property) {
    return (
      <Layout>
        <div className="py-32 text-center container-custom">
          <h1 className="font-display text-2xl">Property not found</h1>
          <Link to="/listings" className="text-[hsl(var(--secondary))] mt-4 inline-block">Back to Listings</Link>
        </div>
      </Layout>
    );
  }

  const p = property as {
    price?: number; priceLabel?: string; address?: string; city?: string;
    bedrooms?: number; bathrooms?: number; garage?: number; sqft?: number;
    amenities?: string[]; features?: string[]; agentId?: string;
    floorPlanUrl?: string; virtualTourUrl?: string; energyRating?: string;
    status?: string; openHouse?: string; gallery?: string[];
  };

  const gallery = p.gallery?.length ? p.gallery : [property.image];
  const agent = team.find(a => a.id === p.agentId);
  const similar = projects.filter(pr => pr.id !== property.id && pr.category === property.category).slice(0, 3);
  const price = p.price || 0;
  const mortgage = price > 100000 ? calculateMortgage({ price, downPaymentPercent: downPayment, interestRate, termYears }) : null;

  return (
    <Layout>
      <Helmet>
        <title>{property.title} | {COMPANY.name}</title>
        <meta name="description" content={property.description} />
      </Helmet>

      <div className="pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-1 h-[42vh] sm:h-[48vh] lg:h-[56vh] max-h-[480px] overflow-hidden isolate">
          <button
            type="button"
            className="lg:col-span-2 relative min-h-0 h-full w-full overflow-hidden group cursor-pointer"
            onClick={() => { setGalleryIdx(0); setGalleryOpen(true); }}
          >
            <img
              src={resolveProjectImage(property.id, gallery[0])}
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
                onClick={() => { setGalleryIdx(i + 1); setGalleryOpen(true); }}
              >
                <img
                  src={resolveProjectImage(property.id, src)}
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

        <div className="container-custom container-inset py-10 relative z-10 bg-background">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <Link to="/listings" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[hsl(var(--secondary))] mb-6">
                <ArrowLeft className="h-4 w-4" /> Back to Listings
              </Link>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-3 py-1 bg-[hsl(var(--primary))] text-white text-[10px] uppercase tracking-wider">{p.status || "For Sale"}</span>
                {p.openHouse && <span className="px-3 py-1 bg-[hsl(var(--secondary))] text-white text-[10px] uppercase tracking-wider">Open House: {p.openHouse}</span>}
              </div>
              <h1 className="font-display text-3xl md:text-4xl text-[hsl(var(--primary))] mb-2">{property.title}</h1>
              <p className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin className="h-4 w-4" />{p.address}, {p.city}
              </p>
              <p className="font-display text-3xl text-[hsl(var(--secondary))] mb-8">{p.priceLabel}</p>

              <div className="flex flex-wrap gap-6 py-6 border-y border-border mb-8 text-sm">
                {p.bedrooms ? <span className="flex items-center gap-2"><Bed className="h-4 w-4 text-[hsl(var(--secondary))]" />{p.bedrooms} Bedrooms</span> : null}
                {p.bathrooms ? <span className="flex items-center gap-2"><Bath className="h-4 w-4 text-[hsl(var(--secondary))]" />{p.bathrooms} Bathrooms</span> : null}
                {p.garage ? <span className="flex items-center gap-2"><Car className="h-4 w-4 text-[hsl(var(--secondary))]" />{p.garage} Garage</span> : null}
                {p.sqft ? <span className="flex items-center gap-2"><Maximize className="h-4 w-4 text-[hsl(var(--secondary))]" />{p.sqft.toLocaleString()} sqft</span> : null}
                {p.energyRating && <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-[hsl(var(--secondary))]" />Energy: {p.energyRating}</span>}
              </div>

              <h2 className="luxury-subheading mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed mb-10">{property.description}</p>

              {p.amenities && p.amenities.length > 0 && (
                <>
                  <h2 className="luxury-subheading mb-4">Amenities</h2>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {p.amenities.map(a => (
                      <span key={a} className="px-4 py-2 bg-[hsl(var(--muted))] text-sm">{a}</span>
                    ))}
                  </div>
                </>
              )}

              {p.features && p.features.length > 0 && (
                <>
                  <h2 className="luxury-subheading mb-4">Features</h2>
                  <ul className="grid grid-cols-2 gap-2 mb-10 text-sm text-muted-foreground">
                    {p.features.map(f => <li key={f} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[hsl(var(--secondary))] rounded-full" />{f}</li>)}
                  </ul>
                </>
              )}

              <div className="flex gap-4 mb-10">
                {p.floorPlanUrl && (
                  <a href={p.floorPlanUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm uppercase tracking-wider hover:text-[hsl(var(--secondary))]">
                    <FileText className="h-4 w-4" /> Floor Plan
                  </a>
                )}
                {p.virtualTourUrl && (
                  <a href={p.virtualTourUrl} className="flex items-center gap-2 text-sm uppercase tracking-wider hover:text-[hsl(var(--secondary))]">
                    Virtual Tour
                  </a>
                )}
              </div>

              {mortgage && (
                <div className="border border-border p-6 mb-10">
                  <h2 className="luxury-subheading mb-6">Mortgage Calculator</h2>
                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Down Payment %</label>
                      <Input type="number" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} className="mt-1 rounded-none" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Interest Rate %</label>
                      <Input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="mt-1 rounded-none" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Term (years)</label>
                      <Input type="number" value={termYears} onChange={e => setTermYears(Number(e.target.value))} className="mt-1 rounded-none" />
                    </div>
                  </div>
                  <p className="font-display text-3xl text-[hsl(var(--secondary))]">{formatCurrency(mortgage.monthlyPayment)}<span className="text-base text-muted-foreground">/month</span></p>
                </div>
              )}
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start h-fit space-y-6">
              <div className="border border-border p-6 bg-white">
                <div className="flex gap-2 mb-6">
                  <button type="button" onClick={() => setFav(toggleFavorite(property.id).includes(property.id))} className="flex-1 h-10 border border-border flex items-center justify-center gap-2 text-xs uppercase tracking-wider hover:border-[hsl(var(--secondary))]">
                    <Heart className={cn("h-4 w-4", fav && "fill-red-500 text-red-500")} /> Favorite
                  </button>
                  <button type="button" className="flex-1 h-10 border border-border flex items-center justify-center gap-2 text-xs uppercase tracking-wider hover:border-[hsl(var(--secondary))]">
                    <Share2 className="h-4 w-4" /> Share
                  </button>
                  <button type="button" onClick={() => window.print()} className="h-10 w-10 border border-border flex items-center justify-center hover:border-[hsl(var(--secondary))]">
                    <Printer className="h-4 w-4" />
                  </button>
                </div>
                {agent && (
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                    <img src={agent.image} alt="" className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <p className="font-display text-lg">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.role}</p>
                    </div>
                  </div>
                )}
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                  <Input placeholder="Your name" className="rounded-none" />
                  <Input type="email" placeholder="Email" className="rounded-none" />
                  <Input type="tel" placeholder="Phone" className="rounded-none" />
                  <textarea placeholder="Message" rows={3} className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--secondary))]" />
                  <Button type="submit" className="w-full rounded-none bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] uppercase text-xs tracking-wider h-12">
                    Schedule Viewing
                  </Button>
                </form>
              </div>
            </aside>
          </div>

          {similar.length > 0 && (
            <div className="mt-20">
              <h2 className="luxury-subheading mb-8">Similar Properties</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {similar.map(l => <PropertyCard key={l.id} listing={l} />)}
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
          <img src={resolveProjectImage(property.id, gallery[galleryIdx])} alt="" className="max-h-[90vh] max-w-[90vw] object-contain" />
          <button type="button" className="absolute right-4 text-white p-2" onClick={() => setGalleryIdx(i => (i + 1) % gallery.length)} aria-label="Next">
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </Layout>
  );
};

export default PropertyDetail;
