import arizonaRoofDoctors from "@/assets/projects/Roof Doctors Screen.png";
import bossRoofing from "@/assets/projects/bossroofingsiding-com-1024x768desktop-0b61fe.jpg";
import fmorinaBau from "@/assets/projects/fmorina-bau.png";
import goPrimeElectric from "@/assets/projects/goprimeelectric-com-1024x768desktop-1acc70.jpg";
import indyPrecision from "@/assets/projects/indyprecisionpainters-com-1024x768desktop-c7d21c.jpg";
import proLawn from "@/assets/projects/prolawnlandscape-net-1024x768desktop-52c3ff.jpg";
import theHonestGuys from "@/assets/projects/thehonestguysatl-com-1024x768desktop-21d5d7.jpg";

export type CustomerProject = {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  image: string;
  imageAlt: string;
};

/** Order: construction and roofing work first, then other industries. */
export const customerProjects: CustomerProject[] = [
  {
    id: "f-morina-bau",
    name: "F.Morina Bauunternehmen",
    category: "Construction",
    description: "German construction company showcasing Rohbau, concrete, and new-build work.",
    url: "https://www.fmorina-bau.de/",
    image: fmorinaBau,
    imageAlt: "F.Morina Bauunternehmen, construction company website",
  },
  {
    id: "arizonaroofdoctors",
    name: "Arizona Roof Doctors",
    category: "Roofing",
    description: "Phoenix roofing site with service areas, financing, and strong lead focus.",
    url: "https://www.arizonaroofdoctors.com/",
    image: arizonaRoofDoctors,
    imageAlt: "Arizona Roof Doctors, roofing website homepage",
  },
  {
    id: "boss-roofing",
    name: "Boss Roofing & Siding",
    category: "Roofing & exteriors",
    description: "Roofing, siding, and storm restoration for homeowners across Northern Illinois.",
    url: "https://www.bossroofingsiding.com/",
    image: bossRoofing,
    imageAlt: "Boss Roofing-Siding Experts, exterior contractor website",
  },
  {
    id: "the-honest-guys",
    name: "The Honest Guys",
    category: "Home services",
    description: "Residential and commercial cleaning with booking and service-area coverage.",
    url: "https://thehonestguysatl.com/",
    image: theHonestGuys,
    imageAlt: "The Honest Guys, air duct and carpet cleaning website",
  },
  {
    id: "go-prime-electric",
    name: "Go Prime Electric",
    category: "Electrical",
    description: "Multi-service electrician with residential, commercial, and industrial pages.",
    url: "https://goprimeelectric.com/",
    image: goPrimeElectric,
    imageAlt: "Go Prime Electric, electrician website",
  },
  {
    id: "pro-lawn",
    name: "Pro Lawn & Pest Control",
    category: "Lawn & pest",
    description: "Lawn and pest services with quotes, pricing, and local proof.",
    url: "https://prolawnlandscape.net/",
    image: proLawn,
    imageAlt: "Pro Lawn & Pest Control, lawn care website",
  },
  {
    id: "indy-precision",
    name: "Indy Precision Painters",
    category: "Painting",
    description: "Interior and exterior painting with reviews and result galleries.",
    url: "https://indyprecisionpainters.com/",
    image: indyPrecision,
    imageAlt: "Indy Precision Painters, painting company website",
  },
];
