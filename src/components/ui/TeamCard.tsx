"use client";

import React from "react";
import Image from "next/image";

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
  const Wrapper = linkedin ? "a" : "div";

  return (
    <Wrapper
      {...(linkedin
        ? {
            href: linkedin,
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
      className="
        group
        flex
        flex-col
        items-center
        text-center

        h-full

        cursor-pointer
        transition-all
        duration-500
      "
    >
      {/* IMAGE */}

      <div
        className="
          relative
          w-full
          h-[360px]

          flex
          items-end
          justify-center

          overflow-visible
        "
      >
        <Image
          src={imageName}
          alt={name}
          fill
          sizes="400px"
          className="
            object-contain
            object-bottom

            group-hover:scale-[1.03]

            transition-transform
            duration-700

            drop-shadow-[0_30px_80px_rgba(0,0,0,0.6)]
          "
          priority={false}
        />
      </div>

      {/* DETAILS */}

      <div className="mt-4 pb-6">
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
    </Wrapper>
  );
};