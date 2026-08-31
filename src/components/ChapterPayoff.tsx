import type { Artifact, StoryBeat } from "@/data/types";
import { HeardSlide } from "./HeardSlide";

function AccountBrief({
  artifact,
  wash,
}: {
  artifact: Extract<Artifact, { kind: "outbound" }>;
  wash?: string;
}) {
  return (
    <div className="leave leave-map">
      {wash ? (
        <span className="leave-wash" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={wash} alt="" />
        </span>
      ) : null}
      <header className="leave-plan-top">
        <p className="leave-kicker">Draft account brief</p>
        <h3>{artifact.title}</h3>
        <p className="leave-plan-dek">{artifact.page.body}</p>
      </header>

      <ol className="leave-plan-arc">
        {artifact.hypothesis.map((item) => (
          <li key={item.k}>
            <p>{item.k}</p>
            <strong>{item.body}</strong>
          </li>
        ))}
      </ol>

      <div className="leave-out-split">
        <section>
          <p className="leave-kicker">Linked sources</p>
          <ul className="leave-out-list">
            {artifact.evidence.map((item) => (
              <li key={item.source}>
                <strong>{item.source}</strong>
                <span>{item.finding}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <p className="leave-kicker">Human check</p>
          <ul className="leave-out-list">
            {artifact.targets.map((target) => (
              <li key={`${target.name}-${target.role}`}>
                <strong>
                  {target.name} <em>{target.role}</em>
                </strong>
                <span>{target.why}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="leave-out-page">
        <p className="leave-kicker">Draft page</p>
        <h4>{artifact.page.headline}</h4>
        <p>{artifact.page.body}</p>
      </div>
    </div>
  );
}

function FollowUpDraft({
  artifact,
  wash,
}: {
  artifact: Extract<Artifact, { kind: "gmail" }>;
  wash?: string;
}) {
  return (
    <div className="leave leave-followup">
      {wash ? (
        <span className="leave-wash" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={wash} alt="" />
        </span>
      ) : null}
      <header className="leave-paper-top">
        <div>
          <p className="leave-kicker">Draft email · not sent</p>
          <h3>{artifact.title}</h3>
        </div>
        <p className="leave-paper-from">Human approval required</p>
      </header>
      <section className="leave-reply">
        <p className="leave-reply-meta">
          <span>To</span>
          {artifact.to}
        </p>
        <p className="leave-reply-meta">
          <span>Subject</span>
          {artifact.subject}
        </p>
        <p className="leave-reply-body">{artifact.body}</p>
      </section>
    </div>
  );
}

function SourcedAnswer({
  artifact,
  wash,
}: {
  artifact: Extract<Artifact, { kind: "redlines" }>;
  wash?: string;
}) {
  return (
    <div className="leave leave-paper">
      {wash ? (
        <span className="leave-wash" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={wash} alt="" />
        </span>
      ) : null}
      <header className="leave-paper-top">
        <div>
          <p className="leave-kicker">Source review</p>
          <h3>{artifact.title}</h3>
        </div>
        <p className="leave-paper-from">{artifact.from}</p>
      </header>
      <div className="leave-paper-split">
        <section className="leave-marks">
          <p className="leave-kicker">{artifact.paperTitle}</p>
          <ol>
            {artifact.marks.map((mark) => (
              <li key={mark.text} className={mark.take ? "is-take" : "is-hold"}>
                <p className="leave-mark-line">{mark.text}</p>
                <p className="leave-mark-note">
                  <b>{mark.take ? "Source" : "Hold"}.</b> {mark.note}
                </p>
              </li>
            ))}
          </ol>
        </section>
        <section className="leave-reply">
          <p className="leave-kicker">Draft reply · not sent</p>
          <p className="leave-reply-meta">
            <span>To</span>
            {artifact.reply.to}
          </p>
          <p className="leave-reply-meta">
            <span>Subject</span>
            {artifact.reply.subject}
          </p>
          <p className="leave-reply-body">{artifact.reply.body}</p>
        </section>
      </div>
    </div>
  );
}

export function ChapterPayoff({
  beat,
  wash,
  value,
}: {
  beat: StoryBeat;
  wash?: string;
  value?: string;
}) {
  const slides = beat.slides;
  const artifact = beat.artifact;

  let body = null;
  if (slides?.length) {
    body = <HeardSlide slides={slides} size="lg" wash={wash} />;
  } else if (artifact?.kind === "outbound") {
    body = <AccountBrief artifact={artifact} wash={wash} />;
  } else if (artifact?.kind === "gmail") {
    body = <FollowUpDraft artifact={artifact} wash={wash} />;
  } else if (artifact?.kind === "redlines") {
    body = <SourcedAnswer artifact={artifact} wash={wash} />;
  }

  if (!body) return null;

  return (
    <div className="chapter-payoff">
      <p className="payoff-label">
        {beat.when ? <span>{beat.when}</span> : null}
        {beat.label}
      </p>
      {body}
      {value ? <p className="leave-value">{value}</p> : null}
    </div>
  );
}
