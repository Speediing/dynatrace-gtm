import type { SlideCard } from "@/data/types";

export function HeardSlide({
  slides,
  size = "lg",
  wash,
}: {
  slides: SlideCard[];
  size?: "sm" | "lg";
  wash?: string;
}) {
  return (
    <div className={`leave leave-deck size-${size}`}>
      {wash ? (
        <span className="leave-wash" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={wash} alt="" />
        </span>
      ) : null}
      <ol className={`deck-slides size-${size}`}>
        {slides.map((slide) => (
          <li
            key={slide.n}
            className={`deck-tile voice-${slide.voice || "us"}`}
          >
            <div className="deck-tile-bar">
              <span className="deck-kicker">{slide.kicker || "Draft"}</span>
              <span className="deck-n">{slide.n}</span>
            </div>
            <h3 className="deck-tile-title">{slide.title}</h3>
            <p className={slide.voice === "them" ? "deck-quote" : "deck-map"}>
              {slide.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
