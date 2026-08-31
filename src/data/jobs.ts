import type { Artifact, GtmJob } from "./types";

export const TARGET_ACCOUNT_BRIEF: Extract<
  Artifact,
  { kind: "outbound" }
> = {
  kind: "outbound",
  title: "Illustrative target account brief",
  account: "Example account",
  hypothesis: [
    {
      k: "Public facts",
      body: "Company pages, filings, and approved news sources are collected with links. The rep checks each source.",
    },
    {
      k: "Working hypothesis",
      body: "A platform change may create a need across observability, security, or developer workflows. Validate this in discovery.",
    },
    {
      k: "Open questions",
      body: "Current tools, business priorities, owners, and timing stay open until discovery.",
    },
  ],
  evidence: [
    {
      source: "Company site",
      finding: "Source collected. No claim is used without a link to the page.",
    },
    {
      source: "Public filings",
      finding: "Source collected. The rep checks the date and context.",
    },
    {
      source: "Approved news sources",
      finding: "Source collected. Unsupported claims stay out of the brief.",
    },
  ],
  targets: [
    {
      name: "Customer contact",
      role: "Role TBD",
      why: "Confirm the right owner before outreach.",
    },
  ],
  page: {
    headline: "Example account research brief",
    body: "Illustrative workflow. Public facts stay linked. Hypotheses stay labeled. The rep approves any use.",
  },
};

export const FOLLOW_UP_DRAFT: Extract<Artifact, { kind: "gmail" }> = {
  kind: "gmail",
  title: "Illustrative post-call follow-up",
  to: "Customer contact",
  subject: "Follow-up from our meeting",
  body: "Hi,\n\nThanks for the time today. I drafted this from the approved meeting notes.\n\nTopics in the notes include platform integration, AI workflows, and mission-critical reliability.\n\nOwners, success criteria, and next steps are still open. Please correct anything I missed.\n\nThis stays a draft until the account owner approves it.\n\nBest,",
};

export const SOURCED_ANSWER: Extract<Artifact, { kind: "redlines" }> = {
  kind: "redlines",
  title: "Illustrative sourced answer",
  paperTitle: "Customer questions",
  from: "Customer contact · illustrative workflow",
  marks: [
    {
      text: "Where does the product run?",
      note: "Use the current deployment documentation. Include the source link. Do not add an unsupported summary.",
      take: true,
    },
    {
      text: "How is customer data handled?",
      note: "Use the current data-handling documentation and approved terms. Keep the source date visible.",
      take: true,
    },
    {
      text: "Which security controls apply?",
      note: "Use the current security documentation. Route any gap to the security owner.",
      take: true,
    },
    {
      text: "Can you confirm commercial terms?",
      note: "Hold. Use only the approved order form or procurement response.",
      take: false,
    },
  ],
  reply: {
    to: "Customer contact",
    subject: "Sources for your technical review",
    body: "Hi,\n\nHere are the current sources for your review:\n\n• Deployment documentation: [approved source]\n• Data handling and terms: [approved source]\n• Security controls: [approved source]\n\nI left commercial terms out because the approved procurement response is still needed.\n\nThis is a draft for account-owner review.\n\nBest,",
  },
};

export const JOBS: GtmJob[] = [
  {
    id: "account-brief",
    number: 1,
    title: "Build a source-backed account brief",
    trigger: "A target account enters the list",
    backgroundAction: "Collecting public sources and labeling hypotheses",
    problem:
      "Account research is slow to repeat and easy to overstate. A useful brief separates public facts, sales hypotheses, and open questions.",
    botJob:
      "The agent collects approved public sources, drafts a short brief, and labels every hypothesis. The rep checks the sources before using it.",
    storyboard: [
      {
        when: "Account added",
        label: "The agent opens approved public sources for the example account.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Example account",
          sources: ["Company site", "Public filings", "Approved news"],
          signal: "Sources collected",
        },
      },
      {
        when: "Source check",
        label: "Facts, hypotheses, and missing discovery stay separate.",
        scene: "notes",
        visual: {
          kind: "three-why",
          items: [
            { label: "Facts", answer: "Linked to public sources" },
            { label: "Hypothesis", answer: "Marked for validation" },
            { label: "Open items", answer: "Tools, owners, timing" },
          ],
        },
      },
      {
        when: "Draft ready",
        label: "The rep gets a brief, source list, and discovery questions.",
        scene: "map",
        visual: {
          kind: "outreach-ready",
          person: "Customer contact · role TBD",
          channels: ["Account brief", "Source list", "Questions"],
          status: "Draft · nothing sent",
        },
      },
      {
        when: "Visible artifact",
        label: "The account brief stays a draft until the rep approves it.",
        scene: "send",
        artifact: TARGET_ACCOUNT_BRIEF,
      },
    ],
    unlock:
      "A short research brief with linked sources, labeled hypotheses, and clear gaps.",
    outcome:
      "One target account becomes a reviewable brief. The rep decides what to use.",
    clips: ["02-prospecting-pg"],
    demo: {
      title: "Account research",
      subtitle: "Public sources to a reviewable brief",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "research",
          name: "Research agent",
          role: "bot",
          persona: "Builds sourced briefs and keeps hypotheses labeled",
          color: "#8261CF",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "research",
          kind: "routine",
          body: "Example account entered the target list. I am collecting approved public sources. I will keep facts, hypotheses, and open questions separate.",
        },
        {
          id: "m2",
          from: "research",
          kind: "text",
          body: "The source set is ready. I found company pages, public filings, and approved news coverage. I have not inferred priorities, owners, or timing.",
        },
        {
          id: "m3",
          from: "research",
          kind: "draft",
          draftLabel: "Source notes",
          artifact: {
            kind: "packet",
            title: "Example account source notes",
            fields: TARGET_ACCOUNT_BRIEF.evidence.map((item) => ({
              label: item.source,
              value: item.finding,
            })),
          },
        },
        {
          id: "m4",
          from: "research",
          kind: "draft",
          draftLabel: "Target account brief",
          artifact: TARGET_ACCOUNT_BRIEF,
        },
        {
          id: "m5",
          from: "research",
          kind: "system",
          body: "Nothing sent. The rep checks every source and approves any use.",
        },
      ],
    },
  },
  {
    id: "call-followup",
    number: 2,
    title: "Draft the post-call follow-up",
    trigger: "An approved meeting note is ready",
    backgroundAction: "Reading notes and drafting the follow-up",
    problem:
      "A follow-up can lose the details that matter or add claims the customer did not make. The draft should stay tied to approved notes.",
    botJob:
      "The agent reads the meeting notes, lists open items as TBD, and drafts the email. The account owner edits and sends it.",
    storyboard: [
      {
        when: "Meeting ends",
        label: "The illustrative call ends. The agent waits for approved notes.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "Illustrative customer call",
          people: [
            { initials: "AE", name: "You" },
            { initials: "CC", name: "Customer contact" },
            { initials: "MN", name: "Meeting notes" },
          ],
        },
      },
      {
        when: "Notes approved",
        label: "The agent checks the notes, attendees, and open actions.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Meeting notes", answer: "Topics captured" },
            { name: "Attendee list", answer: "Roles checked" },
            { name: "Action items", answer: "Unknowns left TBD" },
          ],
          status: "Source check complete",
        },
      },
      {
        when: "Draft ready",
        label: "The account owner gets a short follow-up to review.",
        scene: "send",
        visual: {
          kind: "reply-ready",
          to: "Customer contact",
          subject: "Follow-up from our meeting",
          status: "Ready for review",
        },
      },
      {
        when: "Visible artifact",
        label: "The final frame is the email draft. It is not sent.",
        scene: "send",
        artifact: FOLLOW_UP_DRAFT,
      },
    ],
    unlock:
      "A follow-up grounded in approved notes, with unknowns left as TBD.",
    outcome:
      "Approved notes become a concise email draft. The account owner stays in control.",
    clips: ["03-slides-granola"],
    demo: {
      title: "Follow-up",
      subtitle: "Approved meeting notes to an email draft",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "followup",
          name: "Follow-up agent",
          role: "bot",
          persona: "Drafts follow-ups from approved meeting notes",
          color: "#47AE8F",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "followup",
          kind: "routine",
          body: "The illustrative meeting ended. I am waiting for the approved notes before I draft anything.",
        },
        {
          id: "m2",
          from: "followup",
          kind: "text",
          body: "Approved notes found. They cover platform integration, AI workflows, and mission-critical reliability. Owners, success criteria, and next steps remain open.",
        },
        {
          id: "m3",
          from: "followup",
          kind: "draft",
          draftLabel: "Notes used for the draft",
          artifact: {
            kind: "packet",
            title: "Illustrative meeting note",
            fields: [
              {
                label: "Topics",
                value:
                  "Platform integration, AI workflows, and mission-critical reliability.",
              },
              {
                label: "Still open",
                value:
                  "Owners, success criteria, and next steps.",
              },
              {
                label: "Rule",
                value: "Do not add a claim that is not in the approved notes.",
              },
            ],
          },
        },
        {
          id: "m4",
          from: "followup",
          kind: "draft",
          draftLabel: "Post-call follow-up",
          artifact: FOLLOW_UP_DRAFT,
        },
        {
          id: "m5",
          from: "followup",
          kind: "system",
          body: "Nothing sent. The account owner edits and approves the draft.",
        },
      ],
    },
  },
  {
    id: "sourced-answer",
    number: 3,
    title: "Answer a customer question with sources",
    trigger: "A technical or procurement question lands",
    backgroundAction: "Checking approved sources and drafting a response",
    problem:
      "A technical or procurement answer can stall across internal teams. A fast reply still needs current sources and a clear hold for anything unverified.",
    botJob:
      "The agent checks approved documentation and terms, drafts a sourced answer, and routes any gap to the right owner. The account owner approves the reply.",
    storyboard: [
      {
        when: "Question received",
        label: "An illustrative customer question enters the review queue.",
        scene: "notes",
        visual: {
          kind: "procurement-email",
          sender: "Customer contact",
          subject: "Technical and procurement questions",
          questions: 4,
        },
      },
      {
        when: "Sources checked",
        label: "The agent separates sourced answers from items that need an owner.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Product docs", answer: "Current source linked" },
            { name: "Security docs", answer: "Current source linked" },
            { name: "Approved terms", answer: "Commercial item held" },
          ],
          status: "Review complete",
        },
      },
      {
        when: "Visible artifact",
        label: "The sourced response stays a draft until the account owner approves it.",
        scene: "send",
        artifact: SOURCED_ANSWER,
      },
    ],
    unlock:
      "A sourced answer draft with unsupported items held for an owner.",
    outcome:
      "A customer question becomes a sourced draft. Nothing leaves without approval.",
    clips: ["01-morning-inbox"],
    demo: {
      title: "Sourced answers",
      subtitle: "Customer question to an approved-source draft",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "answers",
          name: "Answers agent",
          role: "bot",
          persona: "Checks approved sources and holds unsupported claims",
          color: "#528DEE",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "answers",
          kind: "routine",
          body: "An illustrative technical and procurement question arrived. I am checking current product, security, and approved commercial sources.",
        },
        {
          id: "m2",
          from: "answers",
          kind: "text",
          body: "The deployment, data-handling, and security answers have current source placeholders. The commercial item needs the approved procurement response, so I held it.",
        },
        {
          id: "m3",
          from: "answers",
          kind: "draft",
          draftLabel: "Questions and source plan",
          artifact: SOURCED_ANSWER,
        },
        {
          id: "m4",
          from: "answers",
          kind: "draft",
          draftLabel: "Customer reply",
          artifact: {
            kind: "gmail",
            title: "Illustrative sourced reply",
            to: SOURCED_ANSWER.reply.to,
            subject: SOURCED_ANSWER.reply.subject,
            body: SOURCED_ANSWER.reply.body,
          },
        },
        {
          id: "m5",
          from: "answers",
          kind: "system",
          body: "Nothing sent. The account owner checks every source and approves the reply.",
        },
      ],
    },
  },
];

export function getJob(id: string): GtmJob | undefined {
  return JOBS.find((job) => job.id === id);
}
