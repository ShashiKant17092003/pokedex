"use client";

import { Box } from "@mui/material";

export default function Pokeball({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        left: "50%",
        top: "50%",
        width: 120,
        height: 120,
        borderRadius: "50%",
        background:
          "linear-gradient(to bottom, #ff1c1c 50%, #ffffff 50%)",
        border: "6px solid #000",
        transform: "translate(-50%, -50%)",
        animation: "throwBall 0.9s ease-out forwards",
        zIndex: 1400,
        "&::after": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 26,
          height: 26,
          background: "#fff",
          border: "5px solid #000",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    />
  );
}
