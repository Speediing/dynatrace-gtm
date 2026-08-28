import { CompareTable } from "@/components/CompareTable";
import { HeroTelemetry } from "@/components/HeroTelemetry";
import { JobSection } from "@/components/JobSection";
import { RosterChart } from "@/components/RosterChart";
import { SiteNav } from "@/components/SiteNav";
import { JOBS } from "@/data/jobs";

export default function HomePage() {
  return (
    <main id="top">
      <div className="hero-watercolor">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-watercolor-image"
          src="/brand/watercolor-hero.jpg"
          alt=""
        />
        <SiteNav />
      </div>

      <div className="report">
        <div className="report-hero">
          <HeroTelemetry />
          <section className="hero">
            <div>
              <p className="eyebrow">Grok Bot for Dynatrace GTM</p>
              <h1>Agents do the prep. Sellers make the call.</h1>
              <p className="hero-intro">
                Grok Bot can research accounts, draft follow-ups, and prepare
                sourced answers. The account owner reviews every output.
              </p>
            </div>
          </section>

          <section className="usecase-framing">
            <p className="eyebrow">Three illustrative use cases</p>
            <h2>
              A small fleet prepares the work around each customer
              conversation.
            </h2>
            <p>
              Each example shows how an agent starts, checks its inputs, and
              leaves a draft for review.
            </p>
          </section>

          <RosterChart />
        </div>

        <div id="jobs">
          {JOBS.map((job) => (
            <JobSection key={job.id} job={job} />
          ))}
        </div>
      </div>

      <div className="orbit-break" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/watercolor-orbit.jpg" alt="" />
      </div>

      <div className="report">
        <CompareTable />
      </div>

      <footer className="site-footer">
        <div>
          <p className="footer-title">Dynatrace x SpaceXAI</p>
          <p>Illustrative Grok Bot workflows for Dynatrace GTM</p>
        </div>
        <address className="footer-contact">
          <strong>Tyler Pickler</strong>
          <a href="mailto:tyler.pickler@cursor.com">tyler.pickler@cursor.com</a>
        </address>
      </footer>
    </main>
  );
}
