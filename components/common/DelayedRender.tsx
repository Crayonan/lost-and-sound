"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";

const RIPPLE_DURATION_MS = 1000; // ⏱ Match the ripple animation duration

export default function DelayedRender({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, RIPPLE_DURATION_MS); // wait exactly one ripple cycle
    return () => clearTimeout(timeout);
  }, []);

  if (!show) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}
