import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  jobId?: JobId;
  mark?: string;
  seat?: boolean;
};

export const FLEET: FleetBot[] = [
  {
    id: "rep",
    name: "Dynatrace account owner",
    blurb: "Reviews sources, edits every draft, and decides what leaves the workspace.",
    color: "#E8E8ED",
    mark: "AE",
    seat: true,
  },
  {
    id: "research",
    name: "Research agent",
    blurb: "Builds an account brief from approved public sources.",
    jobId: "account-brief",
    color: "#8261CF",
  },
  {
    id: "followup",
    name: "Follow-up agent",
    blurb: "Turns approved meeting notes into a reviewable email draft.",
    jobId: "call-followup",
    color: "#47AE8F",
  },
  {
    id: "answers",
    name: "Answers agent",
    blurb: "Checks current sources and holds anything that needs an owner.",
    jobId: "sourced-answer",
    color: "#528DEE",
  },
];
