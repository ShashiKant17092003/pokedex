"use client";

import { Fade, Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(false);
    const t = setTimeout(() => setShow(true), 120);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <Fade in={show} timeout={300}>
      <Box sx={{ minHeight: "100vh" }}>{children}</Box>
    </Fade>
  );
}
