import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, ImagePlus, Mail, Printer, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SiteLayout from "@/components/layout/SiteLayout";
import PageHeader from "@/components/layout/PageHeader";
import {
  CHECKLIST_UPLOAD,
  NICE_TO_HAVE_CHECKLIST,
  PRIORITY_CHECKLIST,
} from "@/data/clientChecklist";
import {
  formatFileSize,
  readFileAsPayload,
  validateChecklistImage,
  type ChecklistFilePayload,
} from "@/lib/checklistFiles";
import { sendNexoraFormEmail } from "@/lib/sendFormEmails";

const MAILTO_HREF =
  "mailto:info@nexora-agn.com?subject=" +
  encodeURIComponent("Client checklist materials") +
  "&body=" +
  encodeURIComponent(
    "Hi Nexora team,\n\nHere is what I have ready for my website preview:\n\nBusiness name:\nPhone:\nEmail:\nAddress:\n\nServices:\nHours:\nService areas:\n\nPhoto / logo links:\nSocial / Google listing:\nNotes:\n"
  );

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {hint ? <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p> : null}
      {children}
    </div>
  );
}

function Section({
  title,
  subtitle,
  priority,
  children,
}: {
  title: string;
  subtitle: string;
  priority?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`rounded-2xl border p-6 shadow-sm md:p-8 ${
        priority ? "border-border/70 bg-card/40" : "border-border/50 bg-muted/15"
      }`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">{title}</h2>
        {priority ? (
          <span className="rounded-md bg-brand/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-950">
            Priority
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

const ClientChecklist = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const photosInputRef = useRef<HTMLInputElement>(null);

  const onLogoChange = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    const err = validateChecklistImage(file, CHECKLIST_UPLOAD.logoMaxBytes);
    if (err) {
      toast.error(err);
      return;
    }
    setLogoFile(file);
  };

  const onPhotosChange = (files: FileList | null) => {
    if (!files?.length) return;
    const next = [...photoFiles];
    for (const file of Array.from(files)) {
      if (next.length >= CHECKLIST_UPLOAD.photoMaxCount) {
        toast.error(`You can upload up to ${CHECKLIST_UPLOAD.photoMaxCount} photos here.`);
        break;
      }
      const err = validateChecklistImage(file, CHECKLIST_UPLOAD.photoMaxBytes);
      if (err) {
        toast.error(err);
        continue;
      }
      if (next.some((f) => f.name === file.name && f.size === file.size)) continue;
      next.push(file);
    }
    setPhotoFiles(next);
    if (photosInputRef.current) photosInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const str = (key: string) => String(fd.get(key) ?? "").trim();

    const name = str("name");
    const email = str("email");
    const company = str("company");
    const phone = str("phone");
    const address = str("address");
    const services = str("services");
    const hours = str("hours");
    const serviceAreas = str("serviceAreas");
    const branding = str("branding");
    const socialLinks = str("socialLinks");
    const reviews = str("reviews");
    const offers = str("offers");
    const teamBios = str("teamBios");
    const faq = str("faq");
    const inspiration = str("inspiration");
    const domainNotes = str("domainNotes");
    const photoAlbumLink = str("photoAlbumLink");
    const additionalNotes = str("additionalNotes");

    if (!name || !email || !company) {
      toast.error("Please fill in your name, business name, and email.");
      return;
    }

    const hasContent =
      phone ||
      address ||
      services ||
      hours ||
      serviceAreas ||
      branding ||
      socialLinks ||
      reviews ||
      offers ||
      teamBios ||
      faq ||
      inspiration ||
      domainNotes ||
      photoAlbumLink ||
      additionalNotes ||
      logoFile ||
      photoFiles.length > 0;

    if (!hasContent) {
      toast.error("Add at least one detail, link, or file from the checklist.");
      return;
    }

    setSending(true);
    try {
      let logo: ChecklistFilePayload | undefined;
      let photos: ChecklistFilePayload[] = [];
      if (logoFile) logo = await readFileAsPayload(logoFile);
      if (photoFiles.length) {
        photos = await Promise.all(photoFiles.map((f) => readFileAsPayload(f)));
      }

      await sendNexoraFormEmail({
        formType: "client_checklist",
        name,
        email,
        company,
        phone: phone || undefined,
        address: address || undefined,
        services: services || undefined,
        hours: hours || undefined,
        serviceAreas: serviceAreas || undefined,
        branding: branding || undefined,
        socialLinks: socialLinks || undefined,
        reviews: reviews || undefined,
        offers: offers || undefined,
        teamBios: teamBios || undefined,
        faq: faq || undefined,
        inspiration: inspiration || undefined,
        domainNotes: domainNotes || undefined,
        photoAlbumLink: photoAlbumLink || undefined,
        additionalNotes: additionalNotes || undefined,
        logo,
        photos: photos.length ? photos : undefined,
      });
      setSubmitted(true);
      form.reset();
      setLogoFile(null);
      setPhotoFiles([]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send your details.");
    } finally {
      setSending(false);
    }
  };

  return (
    <SiteLayout>
      <div className="print:hidden">
        <PageHeader
          breadcrumb={[
            { label: "Home", to: "/" },
            { label: "Client checklist" },
          ]}
          title="Prepare for your demo"
          description="Fill in what you have before we meet — we’ll personalize your website preview so it looks like your business, not a generic template. Incomplete is fine."
        />
      </div>

      <div className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Upload a logo and a few photos below, or paste Drive / Dropbox / Google Photos
            links. Larger batches can go to{" "}
            <a
              href="mailto:info@nexora-agn.com"
              className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
            >
              info@nexora-agn.com
            </a>
            .
          </p>
          <Button
            type="button"
            variant="outline"
            className="h-10 gap-2 rounded-lg"
            onClick={() => window.print()}
          >
            <Printer className="h-4 w-4" aria-hidden />
            Print checklist
          </Button>
        </div>

        <div className="mb-8 hidden print:block">
          <h1 className="text-2xl font-bold tracking-tight">Nexora client checklist</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Gather these items before your demo or after you subscribe. Send what you have
            to info@nexora-agn.com.
          </p>
          <ul className="mt-6 space-y-3">
            {[...PRIORITY_CHECKLIST, ...NICE_TO_HAVE_CHECKLIST].map((item) => (
              <li key={item.id} className="flex gap-3 print:break-inside-avoid">
                <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="print:hidden">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-border/70 bg-card/40 px-6 py-16 text-center shadow-sm"
              role="status"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700">
                <CheckCircle2 className="h-7 w-7" strokeWidth={2} aria-hidden />
              </div>
              <h2 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                Details received
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Thanks — we’ll use what you sent to personalize your preview. You can still
                email more photos or files to info@nexora-agn.com anytime.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6" noValidate>
              <Section
                title="About you & the business"
                subtitle="Required contact fields so we know who to follow up with."
                priority
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="checklist-name" label="Your name">
                    <Input
                      id="checklist-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Jordan Smith"
                      required
                      className="h-11 rounded-lg"
                      disabled={sending}
                    />
                  </Field>
                  <Field id="checklist-company" label="Business name">
                    <Input
                      id="checklist-company"
                      name="company"
                      autoComplete="organization"
                      placeholder="Acme Auto Repair"
                      required
                      className="h-11 rounded-lg"
                      disabled={sending}
                    />
                  </Field>
                  <Field id="checklist-email" label="Email">
                    <Input
                      id="checklist-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@business.com"
                      required
                      className="h-11 rounded-lg"
                      disabled={sending}
                    />
                  </Field>
                  <Field id="checklist-phone" label="Phone">
                    <Input
                      id="checklist-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(555) 123-4567"
                      className="h-11 rounded-lg"
                      disabled={sending}
                    />
                  </Field>
                </div>
                <Field
                  id="checklist-address"
                  label="Business address"
                  hint="Street, city, state, ZIP — or where customers should find you."
                >
                  <Textarea
                    id="checklist-address"
                    name="address"
                    placeholder="123 Main St, Brooklyn, NY 11201"
                    className="min-h-[80px] resize-y rounded-lg"
                    disabled={sending}
                  />
                </Field>
              </Section>

              <Section
                title="Before the demo"
                subtitle="These make the biggest difference for a customized preview."
                priority
              >
                <Field
                  id="checklist-services"
                  label="Services you offer"
                  hint="A rough list is fine — what customers hire you for."
                >
                  <Textarea
                    id="checklist-services"
                    name="services"
                    placeholder="Oil changes, brake repair, diagnostics…"
                    className="min-h-[100px] resize-y rounded-lg"
                    disabled={sending}
                  />
                </Field>
                <Field id="checklist-hours" label="Business hours">
                  <Textarea
                    id="checklist-hours"
                    name="hours"
                    placeholder="Mon–Fri 8am–6pm, Sat 9am–2pm, Closed Sun"
                    className="min-h-[80px] resize-y rounded-lg"
                    disabled={sending}
                  />
                </Field>
                <Field id="checklist-areas" label="Service areas">
                  <Textarea
                    id="checklist-areas"
                    name="serviceAreas"
                    placeholder="Brooklyn, Queens, surrounding neighborhoods…"
                    className="min-h-[80px] resize-y rounded-lg"
                    disabled={sending}
                  />
                </Field>

                <div className="space-y-2">
                  <Label>Logo</Label>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    PNG or SVG preferred. Max {(CHECKLIST_UPLOAD.logoMaxBytes / (1024 * 1024)).toFixed(1)}{" "}
                    MB.
                  </p>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept={CHECKLIST_UPLOAD.acceptLogo}
                    className="sr-only"
                    disabled={sending}
                    onChange={(e) => onLogoChange(e.target.files)}
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 gap-2 rounded-lg"
                      disabled={sending}
                      onClick={() => logoInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4" aria-hidden />
                      {logoFile ? "Replace logo" : "Upload logo"}
                    </Button>
                    {logoFile ? (
                      <span className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm">
                        {logoFile.name}
                        <span className="text-muted-foreground">
                          ({formatFileSize(logoFile.size)})
                        </span>
                        <button
                          type="button"
                          className="rounded p-0.5 text-muted-foreground hover:text-foreground"
                          aria-label="Remove logo"
                          onClick={() => {
                            setLogoFile(null);
                            if (logoInputRef.current) logoInputRef.current.value = "";
                          }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Photos of your business</Label>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Up to {CHECKLIST_UPLOAD.photoMaxCount} images (max{" "}
                    {(CHECKLIST_UPLOAD.photoMaxBytes / (1024 * 1024)).toFixed(0)} MB each). Shop,
                    team, or completed work.
                  </p>
                  <input
                    ref={photosInputRef}
                    type="file"
                    accept={CHECKLIST_UPLOAD.acceptPhotos}
                    multiple
                    className="sr-only"
                    disabled={sending}
                    onChange={(e) => onPhotosChange(e.target.files)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 gap-2 rounded-lg"
                    disabled={sending || photoFiles.length >= CHECKLIST_UPLOAD.photoMaxCount}
                    onClick={() => photosInputRef.current?.click()}
                  >
                    <ImagePlus className="h-4 w-4" aria-hidden />
                    Add photos
                  </Button>
                  {photoFiles.length > 0 ? (
                    <ul className="mt-3 space-y-2">
                      {photoFiles.map((file, i) => (
                        <li
                          key={`${file.name}-${file.size}-${i}`}
                          className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm"
                        >
                          <span className="min-w-0 truncate">
                            {file.name}{" "}
                            <span className="text-muted-foreground">
                              ({formatFileSize(file.size)})
                            </span>
                          </span>
                          <button
                            type="button"
                            className="shrink-0 rounded p-0.5 text-muted-foreground hover:text-foreground"
                            aria-label={`Remove ${file.name}`}
                            onClick={() =>
                              setPhotoFiles((prev) => prev.filter((_, idx) => idx !== i))
                            }
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <Field
                  id="checklist-album"
                  label="Photo album link"
                  hint="Optional if you have more photos than the upload limit."
                >
                  <Input
                    id="checklist-album"
                    name="photoAlbumLink"
                    type="url"
                    placeholder="https://drive.google.com/…"
                    className="h-11 rounded-lg"
                    disabled={sending}
                  />
                </Field>
                <Field
                  id="checklist-branding"
                  label="Preferred colors or branding"
                  hint="Brand colors, fonts you like, or a site whose look you admire."
                >
                  <Textarea
                    id="checklist-branding"
                    name="branding"
                    placeholder="#0A0A0A and #F5C517, or “like competitor.com”"
                    className="min-h-[80px] resize-y rounded-lg"
                    disabled={sending}
                  />
                </Field>
                <Field id="checklist-social" label="Social and listing links">
                  <Textarea
                    id="checklist-social"
                    name="socialLinks"
                    placeholder="Google Business, Facebook, Instagram, Yelp…"
                    className="min-h-[80px] resize-y rounded-lg"
                    disabled={sending}
                  />
                </Field>
                <Field id="checklist-reviews" label="Customer reviews or testimonials">
                  <Textarea
                    id="checklist-reviews"
                    name="reviews"
                    placeholder="Paste a few quotes or your Google reviews link"
                    className="min-h-[100px] resize-y rounded-lg"
                    disabled={sending}
                  />
                </Field>
                <Field id="checklist-offers" label="Special offers or promotions">
                  <Textarea
                    id="checklist-offers"
                    name="offers"
                    placeholder="Any current deal, seasonal promo, or financing note"
                    className="min-h-[80px] resize-y rounded-lg"
                    disabled={sending}
                  />
                </Field>
              </Section>

              <Section
                title="Nice to have"
                subtitle="Helpful extras when you’re ready — not required for a strong first look."
              >
                <Field id="checklist-team" label="Team bios">
                  <Textarea
                    id="checklist-team"
                    name="teamBios"
                    placeholder="Names, roles, short intros…"
                    className="min-h-[100px] resize-y rounded-lg"
                    disabled={sending}
                  />
                </Field>
                <Field id="checklist-faq" label="Common customer questions">
                  <Textarea
                    id="checklist-faq"
                    name="faq"
                    placeholder="Pricing, warranties, response times…"
                    className="min-h-[100px] resize-y rounded-lg"
                    disabled={sending}
                  />
                </Field>
                <Field id="checklist-inspiration" label="Sites you like">
                  <Textarea
                    id="checklist-inspiration"
                    name="inspiration"
                    placeholder="URLs of competitor or peer sites you like"
                    className="min-h-[80px] resize-y rounded-lg"
                    disabled={sending}
                  />
                </Field>
                <Field id="checklist-domain" label="Domain and hosting notes">
                  <Textarea
                    id="checklist-domain"
                    name="domainNotes"
                    placeholder="Existing domain, registrar, or hosting provider"
                    className="min-h-[80px] resize-y rounded-lg"
                    disabled={sending}
                  />
                </Field>
                <Field id="checklist-notes" label="Anything else">
                  <Textarea
                    id="checklist-notes"
                    name="additionalNotes"
                    placeholder="Deadlines, must-have pages, or other context"
                    className="min-h-[80px] resize-y rounded-lg"
                    disabled={sending}
                  />
                </Field>
              </Section>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  type="submit"
                  className="h-11 w-full rounded-lg text-base font-semibold sm:w-auto sm:px-10"
                  disabled={sending}
                >
                  {sending ? "Sending…" : "Send what you have"}
                </Button>
                <a
                  href={MAILTO_HREF}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border/70 text-sm font-medium text-foreground transition-colors hover:bg-muted/40 sm:w-auto sm:px-6"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  Or email us directly
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </SiteLayout>
  );
};

export default ClientChecklist;
