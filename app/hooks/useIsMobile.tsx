'use client';

import { useState, useEffect } from "react";
import { isMobile as deviceIsMobile } from "react-device-detect";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Only set mobile state ONCE on the client (the server will use false)
    setIsMobile(deviceIsMobile);
  }, []);

  return isMobile;
};
