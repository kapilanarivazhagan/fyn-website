"use client";

import React from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Headphones,
  Linkedin,
  Newspaper,
  Radio,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { SectionBackground } from "../ui/SectionBackground";
import { GlowCard } from "../ui/GlowCard";
import {
  MediaItem,
  MediaType,
  mediaSections,
  sliderMediaResources,
  sortedMediaResources,
} from "@/data/media";
import { cn } from "@/lib/utils";

const typeLabels: Record<MediaType, string> = {
  funding: "Funding",
  feature: "Feature",
  interview: "Interview",
  podcast: "Podcast",
  linkedin: "LinkedIn",
};

const typeIcons: Record<MediaType, React.ElementType> = {
  funding: BadgeCheck,
  feature: Newspaper,
  interview: Radio,
  podcast: Headphones,
  linkedin: Linkedin,
};

const typeStyles: Record<MediaType, string> = {
  funding: "text-fyn-pink border-fyn-pink/35 bg-fyn-pink/10",
  feature: "text-[#9db7ff] border-[#9db7ff]/30 bg-[#9db7ff]/10",
  interview: "text-[#f7b267] border-[#f7b267]/30 bg-[#f7b267]/10",
  podcast: "text-[#6ee7d8] border-[#6ee7d8]/30 bg-[#6ee7d8]/10",
  linkedin: "text-[#b5f36d] border-[#b5f36d]/30 bg-[#b5f36d]/10",
};

const featuredItem =
  sortedMediaResources.find((item) => item.featured) ?? sortedMediaResources[0];

const topShelfItems = sortedMediaResources
  .filter((item) => item.id !== featuredItem.id)
  .slice(0, 3);

function MediaBadge({ type }: { type: MediaType }) {
  const Icon = typeIcons[type];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest",
        typeStyles[type]
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {typeLabels[type]}
    </span>
  );
}

function MediaImage({
  item,
  compact = false,
  showBadge = true,
}: {
  item: MediaItem;
  compact?: boolean;
  showBadge?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-xl border border-fyn-border/45 bg-[#101010]",
        compact ? "aspect-[16/9]" : "aspect-[16/10]"
      )}
    >
      <img
        src={item.thumbnail}
        alt={item.thumbnailAlt}
        loading="lazy"
        decoding="async"
        className="fyn-media-image absolute inset-0 h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-[1.035] group-hover:opacity-90"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.02),rgba(8,8,8,0.82))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-fyn-text-muted">
            {item.platform}
          </p>
          <p className="mt-1 text-sm font-black uppercase tracking-wide text-fyn-text">
            {item.source}
          </p>
        </div>
        {showBadge && <MediaBadge type={item.type} />}
      </div>
    </div>
  );
}

function MediaCard({ item, dense = false }: { item: MediaItem; dense?: boolean }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${item.title} from ${item.source}`}
      className="group block h-full"
    >
      <GlowCard
        className="h-full rounded-xl border-fyn-border/45 bg-[#0b0b0b]/88 p-0"
        glowColor="rgba(232, 25, 122, 0.11)"
      >
        <div className="flex h-full flex-col">
          <MediaImage item={item} compact={dense} />
          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-fyn-text-muted">
                {item.displayDate}
              </span>
              <ArrowUpRight className="h-4 w-4 text-fyn-pink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <h3 className="mt-4 text-lg font-black uppercase leading-tight tracking-wide text-fyn-text transition-colors duration-300 group-hover:text-fyn-pink">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-fyn-text-muted">
              {item.description}
            </p>
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              {item.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-fyn-text-muted"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </GlowCard>
    </a>
  );
}

function CarouselCard({ item }: { item: MediaItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="group relative mx-2 block w-[290px] shrink-0 overflow-hidden rounded-xl border border-fyn-border/45 bg-[#0b0b0b] sm:w-[360px]"
      aria-label={`Open ${item.title}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.thumbnailAlt}
          loading="lazy"
          decoding="async"
          className="fyn-media-image absolute inset-0 h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-90"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.08),rgba(8,8,8,0.9))]" />
        <div className="absolute left-4 top-4">
          <MediaBadge type={item.type} />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[10px] font-mono uppercase tracking-widest text-fyn-text-muted">
            {item.source} / {item.displayDate}
          </p>
          <h3 className="mt-2 line-clamp-2 text-base font-black uppercase leading-tight text-fyn-text transition-colors group-hover:text-fyn-pink">
            {item.title}
          </h3>
        </div>
      </div>
    </a>
  );
}

export const Media = () => {
  return (
    <section
      id="media"
      className="relative overflow-hidden bg-[#080808] py-12 font-barlow sm:py-16 md:py-20"
    >
      <SectionBackground variant="media" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute left-1/2 top-28 h-px w-[82vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-fyn-pink/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        <div className="max-w-4xl">
          <SectionHeading
            eyebrow="Media & Presence"
            title="Fyn in the EV ecosystem conversation"
            description="A curated public footprint across funding coverage, founder interviews, EV-sector media, and exact social presence."
            align="left"
            className="mb-0"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="mt-12 grid gap-6 lg:grid-cols-[1.16fr_0.84fr]"
        >
          <a
            href={featuredItem.url}
            target="_blank"
            rel="noreferrer"
            className="group block"
            aria-label={`Open featured media resource: ${featuredItem.title}`}
          >
            <GlowCard className="h-full rounded-xl border-fyn-border/50 bg-[#0b0b0b]/90 p-0">
              <div className="grid h-full gap-0 lg:grid-cols-[0.94fr_1.06fr]">
                <MediaImage item={featuredItem} />
                <div className="flex flex-col p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <MediaBadge type={featuredItem.type} />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-fyn-text-muted">
                      Featured / {featuredItem.displayDate}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-black uppercase leading-tight tracking-tight text-fyn-text transition-colors duration-300 group-hover:text-fyn-pink sm:text-3xl">
                    {featuredItem.title}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-fyn-text-muted sm:text-base">
                    {featuredItem.description}
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {featuredItem.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-fyn-text-muted"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-fyn-border/35 pt-5 text-sm font-bold uppercase tracking-widest text-fyn-pink">
                    <span>Read coverage</span>
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </GlowCard>
          </a>

          <div className="grid gap-4">
            {topShelfItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid gap-4 rounded-xl border border-fyn-border/45 bg-[#0b0b0b]/86 p-3 transition-colors hover:border-fyn-pink/35 sm:grid-cols-[150px_1fr]"
                >
                  <MediaImage item={item} compact showBadge={false} />
                  <div className="flex flex-col py-1 pr-1">
                    <div className="flex items-center justify-between gap-3">
                      <MediaBadge type={item.type} />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-fyn-text-muted">
                        {item.displayDate}
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-black uppercase leading-tight text-fyn-text transition-colors group-hover:text-fyn-pink">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-fyn-text-muted">
                      {item.description}
                    </p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {sliderMediaResources.length > 0 && (
        <div className="media-carousel relative z-10 mt-14 overflow-hidden border-y border-fyn-border/40 bg-[#0a0a0a]/88 py-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#080808] to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#080808] to-transparent sm:w-28" />
          <div className="flex w-max animate-media-carousel">
            {[0, 1].map((track) => (
              <div key={track} className="flex shrink-0">
                {sliderMediaResources.map((item) => (
                  <CarouselCard key={`${track}-${item.id}`} item={item} />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto mt-14 max-w-7xl space-y-14 px-4 sm:px-6 md:px-12">
        {mediaSections.map((section) => {
          const items = sortedMediaResources.filter((item) => item.group === section.id);

          return (
            <section key={section.id} aria-labelledby={`media-${section.id}`}>
              <div className="mb-6 grid gap-4 border-b border-fyn-border/35 pb-5 lg:grid-cols-[0.72fr_1fr] lg:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-fyn-pink">
                    {section.eyebrow}
                  </p>
                  <h3
                    id={`media-${section.id}`}
                    className="mt-2 text-2xl font-black uppercase leading-tight tracking-tight text-fyn-text sm:text-3xl"
                  >
                    {section.title}
                  </h3>
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-fyn-text-muted lg:ml-auto">
                  {section.description}
                </p>
              </div>

              <div
                className={cn(
                  "grid grid-cols-1 gap-5",
                  items.length > 4
                    ? "md:grid-cols-2 xl:grid-cols-3"
                    : "md:grid-cols-2 xl:grid-cols-4"
                )}
              >
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.035 }}
                  >
                    <MediaCard item={item} dense={items.length > 4} />
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
};
