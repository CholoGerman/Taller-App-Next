"use client";

import { usePathname } from "next/navigation";
import Pattern from "./Pattern";

export default function PatternWrapper({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";
  const isRegisterPage = pathname === "/register";

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isRegisterPage){
    return <>{children}</>;
  }

  return <Pattern>{children}</Pattern>;
}