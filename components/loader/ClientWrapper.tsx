"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import HandshakeLoader from "./HandShakeLoader";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);  // Adjust duration here

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <>
      {isLoading ? (
        <HandshakeLoader/>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
