"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import HandshakeLoader from "./HandShakeLoader";
import { useLoading } from "../ui/LoadingProvider";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading, stopLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    // Stop loading when pathname changes (navigation complete)
    const timer = setTimeout(() => {
      stopLoading();
    }, 100); // Small delay to ensure smooth transition

    return () => clearTimeout(timer);
  }, [pathname, stopLoading]);

  return isLoading ? <HandshakeLoader /> : <>{children}</>;
}
