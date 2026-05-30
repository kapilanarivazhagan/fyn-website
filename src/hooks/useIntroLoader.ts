"use client";

import { useState, useCallback } from "react";

export function useIntroLoader() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroFinish = useCallback(() => {
    setShowIntro(false);
  }, []);

  return { showIntro, handleIntroFinish };
}
