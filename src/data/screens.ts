import type { ClipId, JobId } from "./types";

export type SiteKind =
  | "granola"
  | "gmail"
  | "gdoc"
  | "research"
  | "page"
  | "clip";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  clip?: ClipId;
  tabs: ChromeTab[];
};

const granola = { id: "granola", host: "granola.app", label: "Granola" };
const gmail = { id: "gmail", host: "mail.google.com", label: "Gmail" };
const gdoc = { id: "gdoc", host: "docs.google.com", label: "Docs" };
const web = { id: "web", host: "example.com", label: "Public sources" };
const draft = { id: "draft", host: "drafts.local", label: "Draft" };

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "account-brief": {
    m1: {
      pill: "Opening approved public sources",
      host: "example.com",
      path: "/company",
      title: "Example account public sources",
      site: "research",
      tabs: [web, gdoc, draft],
    },
    m2: {
      pill: "Checking the public source set",
      host: "example.com",
      path: "/public-sources",
      title: "Example account public sources",
      site: "clip",
      clip: "02-prospecting-pg",
      tabs: [web, gdoc, draft],
    },
    m3: {
      pill: "Writing linked source notes",
      host: "docs.google.com",
      path: "/document/d/example-account-source-notes",
      title: "Example account source notes",
      site: "gdoc",
      tabs: [web, gdoc, draft],
    },
    m4: {
      pill: "Building the account brief",
      host: "drafts.local",
      path: "/example-account-brief",
      title: "Example account research brief",
      site: "page",
      tabs: [web, gdoc, draft],
    },
    m5: {
      pill: "Draft parked for review",
      host: "drafts.local",
      path: "/example-account-brief",
      title: "Example account research brief",
      site: "page",
      tabs: [web, gdoc, draft],
    },
  },
  "call-followup": {
    m1: {
      pill: "Waiting for approved meeting notes",
      host: "granola.app",
      path: "/notes/illustrative-customer-call",
      title: "Illustrative customer call",
      site: "granola",
      tabs: [granola, gdoc, gmail],
    },
    m2: {
      pill: "Checking approved notes",
      host: "granola.app",
      path: "/notes/illustrative-customer-call",
      title: "Illustrative customer call",
      site: "clip",
      clip: "03-slides-granola",
      tabs: [granola, gdoc, gmail],
    },
    m3: {
      pill: "Writing the follow-up from notes",
      host: "docs.google.com",
      path: "/document/d/illustrative-meeting-note",
      title: "Illustrative meeting note",
      site: "gdoc",
      tabs: [granola, gdoc, gmail],
    },
    m4: {
      pill: "Drafting in Gmail",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [granola, gdoc, gmail],
    },
    m5: {
      pill: "Draft parked. Nothing sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [granola, gdoc, gmail],
    },
  },
  "sourced-answer": {
    m1: {
      pill: "Opening the customer question",
      host: "mail.google.com",
      path: "/mail/u/0/#inbox",
      title: "Inbox",
      site: "gmail",
      tabs: [gmail, gdoc],
    },
    m2: {
      pill: "Checking current approved sources",
      host: "docs.google.com",
      path: "/document/d/approved-source-index",
      title: "Approved source index",
      site: "clip",
      clip: "01-morning-inbox",
      tabs: [gmail, gdoc],
    },
    m3: {
      pill: "Separating sourced answers from holds",
      host: "docs.google.com",
      path: "/document/d/customer-question-source-plan",
      title: "Customer question source plan",
      site: "gdoc",
      tabs: [gmail, gdoc],
    },
    m4: {
      pill: "Drafting the sourced reply",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, gdoc],
    },
    m5: {
      pill: "Draft parked. Nothing sent",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, gdoc],
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
