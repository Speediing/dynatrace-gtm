export type HeroJobIcon =
  | "outbound"
  | "research"
  | "follow-up"
  | "deal-desk"
  | "pipeline"
  | "renewal"
  | "competitive"
  | "chief-of-staff";

export type HeroJob = {
  name: string;
  icon: HeroJobIcon;
  account: string;
  signal: string;
  work: string;
  result: string;
  user: string;
  bot: string;
};

export const HERO_JOBS: HeroJob[] = [
  {
    name: "Sales Outbound",
    icon: "outbound",
    account: "Illustrative target account",
    signal: "Public platform signal added",
    work: "I checked approved public sources for observability and platform context, then drafted a short email. Account fit stays a hypothesis until the rep confirms it.",
    result: "Sourced Dynatrace outreach draft ready",
    user: "I reviewed the sources. Send this draft.",
    bot: "sent after your approval. the remaining drafts are held.",
  },
  {
    name: "Account Research",
    icon: "research",
    account: "Illustrative target account",
    signal: "Dynatrace account review opened",
    work: "I gathered public sources on the cloud estate, observability approach, and engineering priorities. Facts, hypotheses, and open questions stay separate.",
    result: "Sourced Dynatrace account brief ready",
    user: "I checked the sources. Save this brief.",
    bot: "saved after your approval. no outreach was sent.",
  },
  {
    name: "Call Follow-up",
    icon: "follow-up",
    account: "Illustrative customer call",
    signal: "Approved meeting notes ready",
    work: "I used the approved notes to capture platform integration, AI workflows, and reliability questions. Owners, dates, and next steps remain open.",
    result: "Follow-up email draft ready",
    user: "I reviewed the recap. Send the email.",
    bot: "sent after your approval. the notes remain unchanged.",
  },
  {
    name: "Deal Desk",
    icon: "deal-desk",
    account: "Illustrative opportunity",
    signal: "Technical review requested",
    work: "I checked current Dynatrace product, deployment, security, and approved commercial sources. Unsupported items stay held for an owner.",
    result: "Sourced Dynatrace response draft ready",
    user: "I reviewed the sources. Send the supported answers.",
    bot: "sent after your approval. unsupported items remain held.",
  },
  {
    name: "Pipeline Review",
    icon: "pipeline",
    account: "Dynatrace opportunity set",
    signal: "Weekly review started",
    work: "I organized open opportunities by last activity and missing next step. I drafted owner follow-ups without changing stages or customer records.",
    result: "Pipeline review draft ready",
    user: "I checked the list. Share it with the account owners.",
    bot: "shared after your approval. no records were changed.",
  },
  {
    name: "Renewal Review",
    icon: "renewal",
    account: "Illustrative Dynatrace customer",
    signal: "Renewal review started",
    work: "I gathered approved usage, support, and account notes, then listed the gaps. Adoption, owner, impact, and timing stay open until the team confirms them.",
    result: "Dynatrace renewal review draft ready",
    user: "I reviewed the gaps. Save this for the account team.",
    bot: "saved after your approval. no customer message was sent.",
  },
  {
    name: "Competitive Intel",
    icon: "competitive",
    account: "Illustrative opportunity",
    signal: "Alternative platform noted",
    work: "I checked approved Dynatrace competitive guidance and source links. The draft separates sourced product facts from rep hypotheses.",
    result: "Sourced Dynatrace talk track ready",
    user: "I checked the source links. Add this to my call brief.",
    bot: "added after your approval. nothing was sent to the customer.",
  },
  {
    name: "Sales Chief of Staff",
    icon: "chief-of-staff",
    account: "Dynatrace GTM review",
    signal: "Review window opened",
    work: "I gathered open drafts, source gaps, and pending approvals across the account set. The brief lists decisions without changing customer records.",
    result: "Dynatrace GTM review brief ready",
    user: "I reviewed the brief. Share it with my team.",
    bot: "shared after your approval. external actions remain blocked.",
  },
];
