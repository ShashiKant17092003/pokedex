"use client";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  MenuItem,
  Select,
  GlobalStyles,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
// This import must match the file we create in step 2
import FireBackground from "./FireBackground"; 

type Props = {
  onSearch?: (value: string) => void;
  onTypeChange?: (value?: string) => void;
};

const POKEMON_TYPES = [
  { type: "grass", label: "Grass", icon: "🌿", color: "#48d0b0" },
  { type: "fire", label: "Fire", icon: "🔥", color: "#fb6c6c" },
  { type: "water", label: "Water", icon: "💧", color: "#76bdfe" },
  { type: "electric", label: "Electric", icon: "⚡", color: "#ffd86e" },
  { type: "psychic", label: "Psychic", icon: "🔮", color: "#f85888" },
  { type: "rock", label: "Rock", icon: "🪨", color: "#b8a038" },
  { type: "ghost", label: "Ghost", icon: "👻", color: "#705898" },
  { type: "bug", label: "Bug", icon: "🐛", color: "#a8b820" },
  { type: "poison", label: "Poison", icon: "🧪", color: "#a040a0" },
  { type: "dark", label: "Dark", icon: "🌑", color: "#705848" },
  { type: "steel", label: "Steel", icon: "⚙️", color: "#b8b8d0" },
  { type: "normal", label: "Normal", icon: "🔘", color: "#a8a878" },
  { type: "fairy", label: "Fairy", icon: "✨", color: "#ee99ac" },
  { type: "dragon", label: "Dragon", icon: "🐲", color: "#7038f8" },
  { type: "fighting", label: "Fighting", icon: "🥊", color: "#c03028" },
  { type: "ice", label: "Ice", icon: "❄️", color: "#98d8d8" },
  { type: "ground", label: "Ground", icon: "⛰️", color: "#e0c068" },
  { type: "flying", label: "Flying", icon: "🌪️", color: "#a890f0" },
];

export default function PokedexNavbar({ onSearch, onTypeChange }: Props) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  return (
    <>
      {/* Dynamic Background logic */}
      {type === "fire" && <FireBackground />}

      <Box sx={{ mx: "auto", px: 3, pt: 2, minWidth: "fit-content", maxWidth: "50%", position: "relative", zIndex: 10 }}>
        <GlobalStyles
          styles={{
            "*::-webkit-scrollbar": { width: "6px" },
            "*::-webkit-scrollbar-track": { background: "#0F1422" },
            "*::-webkit-scrollbar-thumb": { background: "#273250", borderRadius: "10px" },
            "*::-webkit-scrollbar-thumb:hover": { background: "#3f4e7a" },
          }}
        />

        <AppBar
          position="static"
          elevation={0}
          sx={{
            borderRadius: "999px",
            border: "1px solid #273250",
            background: "#0F1422",
            backdropFilter: "blur(14px)",
            px: { xs: 1, md: 3 },
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              fontWeight={800}
              sx={{ display: { xs: "none", sm: "block" }, position: "absolute", left: 16 }}
            >
              Pokédex
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                flexGrow: { xs: 1, sm: 0 },
                position: "absolute",
                right: 16,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  height: 40,
                  borderRadius: "999px",
                  background: "#141a2e",
                  border: "1px solid #273250",
                }}
              >
                <SearchIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 20 }} />
                <InputBase
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    onSearch?.(e.target.value);
                  }}
                  sx={{ color: "#fff", fontSize: 14 }}
                />
              </Box>

              <Select
                value={type}
                displayEmpty
                onChange={(e) => {
                  const value = e.target.value;
                  setType(value);
                  onTypeChange?.(value || undefined);
                }}
                sx={{
                  height: 40,
                  minWidth: { xs: 120, sm: 160 },
                  borderRadius: "999px",
                  background: "#141a2e",
                  border: "1px solid #273250",
                  color: "#fff",
                  "& .MuiSelect-icon": { color: "#fff" },
                }}
                renderValue={(selected) => {
                  if (!selected) return <span style={{ opacity: 0.5 }}>All Types</span>;
                  const found = POKEMON_TYPES.find((t) => t.type === selected);
                  return `${found?.icon} ${found?.label}`;
                }}
              >
                <MenuItem value="">
                  <em>All Types</em>
                </MenuItem>
                {POKEMON_TYPES.map((t) => (
                  <MenuItem key={t.type} value={t.type}>
                    {t.icon} {t.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}