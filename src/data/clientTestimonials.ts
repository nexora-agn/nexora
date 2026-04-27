export type ClientTestimonial = {
  id: string;
  quote: string;
  name: string;
  /**
   * Trade line — must match what that company does (same as the project card category
   * in `customerProjects`), not a generic repeat of the quote.
   */
  industry: string;
};

/**
 * Same brands as `customerProjects`. Quotes name the trade in the copy; `industry`
 * restates the business type in plain language.
 */
export const clientTestimonials: ClientTestimonial[] = [
  {
    id: "f-morina",
    quote:
      "For our construction business, the site reflects how we work on the ground: clear services, strong visuals, and an easy path for new-build and renovation clients to get in touch.",
    name: "F.Morina Bauunternehmen",
    industry: "Construction · commercial & residential building",
  },
  {
    id: "arizona-roof",
    quote:
      "As a roofing contractor, we needed a site that matches how homeowners search and book. Organized from kickoff to launch: the new site fits our market and makes it simple to see what we do and reach us.",
    name: "Arizona Roof Doctors",
    industry: "Roofing · residential & storm work",
  },
  {
    id: "go-prime",
    quote:
      "Our electrical work residential, commercial, and industrial is explained without clutter. We could focus on the business while they handled the site build and go live.",
    name: "Go Prime Electric",
    industry: "Electrical · multi-service contractor",
  },
  {
    id: "indy-painters",
    quote:
      "Interior and exterior painting comes across clearly, with proof of results. A professional presence that supports how we win local jobs.",
    name: "Indy Precision Painters",
    industry: "Painting · interior & exterior",
  },
];
