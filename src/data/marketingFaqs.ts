/** Visible FAQs + FAQPage JSON-LD for marketing pages. Keep in sync with public/llms.txt. */

export type MarketingFaq = {
  question: string;
  answer: string;
};

export const pricingFaqs: MarketingFaq[] = [
  {
    question: "How much does a Nexora website cost?",
    answer:
      "Starter is $99 per month, Growth is $199, and Enterprise is $399. You preview a staged live site before you subscribe.",
  },
  {
    question: "What is included in the monthly price?",
    answer:
      "Hosting, SSL, a branded website, scoped monthly updates, and an AI chatbot on your site. Growth adds catalog and pricing sync plus SEO and Google Ads setup. Enterprise adds unlimited chatbot messages, multi-site rollouts, and advanced integrations.",
  },
  {
    question: "Do I pay before I see my website?",
    answer:
      "No. Nexora stages a live preview you can click through on desktop and mobile. You subscribe after you approve it.",
  },
  {
    question: "Does the website include a chatbot?",
    answer:
      "Yes. Every plan includes an on-site AI assistant. Starter includes 500 messages per month, Growth includes 5,000, and Enterprise includes unlimited messages.",
  },
  {
    question: "Who is Nexora for?",
    answer:
      "Owner-operators and small teams in local trades and services: roofing, electrical, plumbing, construction, painting, landscaping, automotive, real estate, restaurants, barbershops, and retail.",
  },
  {
    question: "How do I get started?",
    answer:
      "Start a project at nexora-agn.com/start, email info@nexora-agn.com, or call +1 (888) 535-9177.",
  },
];

export const aiFaqs: MarketingFaq[] = [
  {
    question: "What is the Nexora AI assistant?",
    answer:
      "An on-site chatbot on your Nexora website. It answers questions about your services, hours, and area, captures name and phone, and can help book jobs, including after hours.",
  },
  {
    question: "Is the chatbot sold separately from the website?",
    answer:
      "No. It is included with every Nexora website subscription. Message limits follow the plan: 500 per month on Starter, 5,000 on Growth, and unlimited on Enterprise.",
  },
  {
    question: "Can it book jobs and send me the lead?",
    answer:
      "Yes. It can take name, phone, and what the customer needs, send the lead to email, WhatsApp, or Telegram, and book a time on your calendar when that is set up.",
  },
  {
    question: "Does it work at night and on weekends?",
    answer:
      "Yes. It replies in seconds, 24 hours a day, including nights and weekends.",
  },
  {
    question: "Can I put this chatbot on a website I already have?",
    answer:
      "The assistant ships with a Nexora hosted website. If you need both a site and a chatbot, start a website project and we include the assistant on the plan.",
  },
  {
    question: "How is the assistant trained?",
    answer:
      "We train it on your services, prices, service area, hours, and common questions so answers sound like your business, not a generic bot.",
  },
];
