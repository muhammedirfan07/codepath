import { useEffect } from "react";

export function useAcademyTheme() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "academy");
    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, []);
}