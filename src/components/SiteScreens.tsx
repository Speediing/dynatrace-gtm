import type { Artifact, DemoMessage } from "@/data/types";
import type { ComputerBeat } from "@/data/screens";
import { CLIPS } from "@/data/clips";

function asGmail(artifact?: Artifact) {
  return artifact?.kind === "gmail" ? artifact : null;
}

function asPacket(artifact?: Artifact) {
  return artifact?.kind === "packet" ? artifact : null;
}

function asRedlines(artifact?: Artifact) {
  return artifact?.kind === "redlines" ? artifact : null;
}

function asOutbound(artifact?: Artifact) {
  return artifact?.kind === "outbound" ? artifact : null;
}

export function SiteScreen({
  beat,
  message,
  account,
  sent,
}: {
  beat: ComputerBeat;
  message?: DemoMessage;
  account: string;
  sent: boolean;
}) {
  const artifact = message?.artifact;

  if (beat.site === "clip" && beat.clip) {
    const clip = CLIPS[beat.clip];
    return (
      <div className="site-clip">
        <video
          src={clip.file}
          controls
          playsInline
          controlsList="nodownload"
          aria-label={clip.title}
        />
      </div>
    );
  }

  switch (beat.site) {
    case "granola":
      return <GranolaScreen />;
    case "gmail":
      return (
        <GmailScreen
          account={account}
          artifact={asGmail(artifact)}
          sent={sent}
        />
      );
    case "gdoc":
      return (
        <GdocScreen
          account={account}
          packet={asPacket(artifact)}
          redlines={asRedlines(artifact)}
        />
      );
    case "research":
      return <ResearchScreen account={account} />;
    case "page":
      return <PageScreen account={account} outbound={asOutbound(artifact)} />;
    default:
      return null;
  }
}

function GranolaScreen() {
  return (
    <div className="site site-granola">
      <header>
        <strong>Granola</strong>
        <span>Illustrative meeting note</span>
      </header>
      <p className="site-time">Approved note required before drafting</p>
      <ul>
        <li>
          <span>Topic</span> Platform integration and developer workflows.
        </li>
        <li>
          <span>Topic</span> AI capabilities and mission-critical reliability.
        </li>
        <li>
          <span>TBD</span> Economic buyer and success metrics.
        </li>
        <li>
          <span>TBD</span> Meeting cadence, interest, and next step.
        </li>
      </ul>
    </div>
  );
}

function GmailScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact: ReturnType<typeof asGmail>;
  sent: boolean;
}) {
  return (
    <div className="site site-gmail">
      <header>
        <strong>Gmail</strong>
        <em>{sent ? "Sent with human approval" : "Draft · not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {artifact?.to || "Customer contact"}
      </p>
      <p>
        <span>Subject</span>
        {artifact?.subject || `${account} question`}
      </p>
      <div>
        {artifact?.body ||
          "Illustrative customer question. Waiting for approved sources."}
      </div>
    </div>
  );
}

function GdocScreen({
  account,
  packet,
  redlines,
}: {
  account: string;
  packet: ReturnType<typeof asPacket>;
  redlines: ReturnType<typeof asRedlines>;
}) {
  return (
    <div className="site site-gdoc">
      <header>
        <strong>Docs</strong>
        <span>
          {packet?.title || redlines?.title || `${account} working note`}
        </span>
      </header>
      <article>
        {packet
          ? packet.fields.map((field) => (
              <p key={field.label}>
                <b>{field.label}.</b> {field.value}
              </p>
            ))
          : redlines
            ? redlines.marks.map((mark) => (
                <p key={mark.text}>
                  <b>{mark.text}</b> {mark.note}
                </p>
              ))
            : <p>Draft notes. Human review required.</p>}
      </article>
    </div>
  );
}

function ResearchScreen({ account }: { account: string }) {
  return (
    <div className="site site-research">
      <header>
        <strong>{account}</strong>
        <span>Approved public sources</span>
      </header>
      <p className="site-time">Illustrative research workflow</p>
      <ul>
        <li>
          <span>Company</span> Collect the public page link and publication
          date.
        </li>
        <li>
          <span>Filings</span> Capture the exact filing section and date.
        </li>
        <li>
          <span>News</span> Use only approved sources and keep the link.
        </li>
        <li>
          <span>TBD</span> Validate buyer, metrics, timing, and interest in
          discovery.
        </li>
      </ul>
    </div>
  );
}

function PageScreen({
  account,
  outbound,
}: {
  account: string;
  outbound: ReturnType<typeof asOutbound>;
}) {
  return (
    <div className="site site-page">
      <header>
        <strong>Account brief</strong>
        <em>Draft · not published</em>
      </header>
      <h4>{outbound?.page.headline || `${account} research brief`}</h4>
      {outbound ? (
        <>
          {outbound.hypothesis.map((item) => (
            <p key={item.k}>
              <b>{item.k}.</b> {item.body}
            </p>
          ))}
          <p>{outbound.page.body}</p>
        </>
      ) : (
        <p>Public facts, labeled hypotheses, and open questions.</p>
      )}
    </div>
  );
}
