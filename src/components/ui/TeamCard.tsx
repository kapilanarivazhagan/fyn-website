"use client";

import React from "react";
import Image from "next/image";
import { Linkedin } from "lucide-react";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  imageName: string;
  linkedin?: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  name,
  role,
  bio,
  imageName,
  linkedin,
}) => {
  const handleLinkedInClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (linkedin) {
      window.open(linkedin, "_blank", "noopener noreferrer");
    }
  };

  return (
    <div
      className="
        group
        flex
        flex-col
        items-center
        text-center

        h-full

        rounded-lg
        transition-all
        duration-500

        outline-none

        hover:bg-fyn-pink/[0.03]
        active:bg-fyn-pink/[0.05]

        p-2

        -m-2

        pointer-events-auto
      "
    >
      {/* IMAGE */}

      <div
        className="
          relative
          w-full
          h-[180px] sm:h-[240px] md:h-[280px] lg:h-[320px] xl:h-[360px]

          flex
          items-center
          justify-center

          overflow-hidden
        "
      >
        <Image
          src={imageName}
          alt={name}
          fill
          sizes="(max-width: 640px) 200px, (max-width: 768px) 280px, (max-width: 1024px) 320px, 360px"
          className="
            object-cover
            object-center

            group-hover:scale-[1.02]

            transition-transform
            duration-700

            drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]
          "
          priority={false}
          quality={85}
        />

        {/* LINKEDIN BUTTON */}

        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkedInClick}
            aria-label={`Visit ${name}'s LinkedIn profile`}
            title={`Open ${name}'s LinkedIn profile`}
            className="
              absolute
              top-2 right-2
              sm:top-3 sm:right-3
              md:top-3 md:right-3

              z-20

              flex
              items-center
              justify-center

              w-8 h-8
              sm:w-9 sm:h-9
              md:w-9 md:h-9

              rounded-full

              pointer-events-auto
              cursor-pointer

              transition-all
              duration-300

              bg-black/20
              backdrop-blur-sm
              border border-white/5

              hover:bg-fyn-pink/35
              hover:border-fyn-pink/40
              hover:shadow-[0_0_12px_rgba(255,95,150,0.3)]

              active:scale-90

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-fyn-pink/60
              focus-visible:ring-offset-2
              focus-visible:ring-offset-black/30

              group-hover:shadow-[0_0_10px_rgba(255,95,150,0.2)]

              hover:backdrop-blur-md

              select-none
              -webkit-user-select-none
              -webkit-touch-callout-none
            "
            style={{
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
              touchAction: "manipulation",
            }}
          >
            <Linkedin
              size={16}
              className="
                sm:w-4 sm:h-4
                md:w-4 md:h-4
                text-white/80
                hover:text-fyn-pink
                transition-colors
                duration-300
              "
              strokeWidth={2}
            />
          </a>
        )}
      </div>

      {/* DETAILS */}

      <div className="mt-1 pb-2 sm:pb-3 md:pb-4">
        {/* NAME */}

        <h3
          className="
            text-2xl
            font-black
            uppercase
            tracking-tight

            text-fyn-text

            group-hover:text-fyn-pink

            transition-colors
            duration-300
          "
        >
          {name}
        </h3>

        {/* ROLE */}

        <p
          className="
            mt-2

            text-xs
            uppercase
            tracking-[0.25em]

            text-fyn-pink/80
            font-semibold
          "
        >
          {role}
        </p>

        {/* BIO */}

        <p
          className="
            mt-4

            text-sm
            leading-relaxed

            text-fyn-text-muted

            max-w-[280px]

            font-medium
          "
        >
          {bio}
        </p>
      </div>
    </div>
  );
};