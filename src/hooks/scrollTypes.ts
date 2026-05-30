export type ViewType =
  | "home"
  | "about"
  | "vision"
  | "what-we-do"
  | "refynd"
  | "infynity"
  | "clients"
  | "media"
  | "careers"
  | "get-involved";

export type MajorView =
  | "home"
  | "about"
  | "vision"
  | "what-we-do"
  | "refynd"
  | "infynity"
  | "clients"
  | "media"
  | "careers";

export const majorSectionTargets: Record<MajorView, string> = {
  home: "home-master",
  about: "about-us",
  vision: "vision-mission",
  "what-we-do": "what-we-do",
  refynd: "refynd",
  infynity: "infynity",
  clients: "clients-partners",
  media: "media",
  careers: "careers",
};

export const legacyContentTargets: Record<ViewType, string> = {
  home: "home-master",
  about: "about-us",
  vision: "vision-mission",
  "what-we-do": "what-we-do",
  refynd: "refynd",
  infynity: "infynity",
  clients: "clients-partners",
  media: "media",
  careers: "careers",
  "get-involved": "get-involved",
};

export const hashTargets: Record<string, string> = {
  home: "home-master",
  "about-us": "about-us",
  about: "about-us",
  "vision-mission": "vision-mission",
  vision: "vision-mission",
  "what-we-do": "what-we-do",
  ecosystem: "ecosystem",
  platforms: "platforms",
  "fleet-impact": "fleet-impact",
  refynd: "refynd",
  infynity: "infynity",
  "clients-partners": "clients-partners",
  clients: "clients-partners",
  "financial-banking": "financial-banking",
  media: "media",
  careers: "careers",
  "culture-careers": "careers",
  "get-involved": "get-involved",
  "get-involved-invest": "get-involved",
  "get-involved-enterprise": "get-involved",
  "get-involved-refynd": "get-involved",
  "get-involved-infynity": "get-involved",
  "get-involved-drive": "get-involved",
  "future-of-fyn": "future-of-fyn",
};

export const majorScrollSections: { id: string; view: MajorView }[] = [
  { id: "hero", view: "home" },
  { id: "about-us", view: "about" },
  { id: "vision-mission", view: "vision" },
  { id: "leadership", view: "about" },
  { id: "what-we-do", view: "what-we-do" },
  { id: "ecosystem", view: "what-we-do" },
  { id: "platforms", view: "what-we-do" },
  { id: "fleet-impact", view: "what-we-do" },
  { id: "clients-partners", view: "clients" },
  { id: "financial-banking", view: "clients" },
  { id: "media", view: "media" },
  { id: "refynd", view: "refynd" },
  { id: "infynity", view: "infynity" },
  { id: "careers", view: "careers" },
];
