"use client";

import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Chip,
  LinearProgress,
  IconButton,
  Card,
  CardMedia,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import FireBackground from "./FireBackground";
import GrassBackground from "./GrassBackground";

const TYPE_COLORS: Record<string, string> = {
  grass: "#48d0b0", fire: "#fb6c6c", water: "#76bdfe", electric: "#ffd86e",
  psychic: "#f85888", dark: "#705848", bug: "#a8b820", rock: "#b8a038",
  ice: "#98d8d8", fairy: "#ee99ac", dragon: "#7038f8", ghost: "#705898",
  ground: "#e0c068", flying: "#a890f0", poison: "#a040a0", steel: "#b8b8d0",
  normal: "#a8a878", fighting: "#c03028",
};

/* ================= HELPERS ================= */

function TableRowItem({ label, value }: { label: string, value: string | number }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Typography variant="caption" sx={{ fontWeight: 900, opacity: 0.4, textTransform: 'uppercase', minWidth: '80px', textAlign: 'left' }}>{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.75rem', textAlign: 'right', maxWidth: '280px' }}>{value || "—"}</Typography>
    </Box>
  );
}

function StatRow({ label, val, min, max }: any) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Typography sx={{ width: 40, fontWeight: 900, fontSize: "0.75rem", opacity: 0.6 }}>{label}</Typography>
      <Box sx={{ flexGrow: 1, mx: 3 }}>
        <LinearProgress variant="determinate" value={(val / 255) * 100} sx={{ height: 6, borderRadius: 10, bgcolor: "rgba(255,255,255,0.1)", "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg, rgba(255,255,255,0.7), #fff)", borderRadius: 10 } }} />
      </Box>
      <Box sx={{ display: "flex", width: 100, justifyContent: "space-between", alignItems: "baseline" }}>
        <Typography sx={{ fontWeight: 900, fontSize: "0.9rem" }}>{val}</Typography>
        <Typography sx={{ fontSize: "0.65rem", opacity: 0.4, fontWeight: 700 }}>{min}-{max}</Typography>
      </Box>
    </Box>
  );
}

function GlassChip({ label, isSecondary }: any) {
  return (
    <Chip 
      label={label?.toUpperCase()} 
      size="small" 
      sx={{ 
        bgcolor: isSecondary ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)", 
        color: "#fff", 
        fontWeight: 900, 
        fontSize: "0.65rem", 
        backdropFilter: "blur(10px)", 
        border: "1px solid rgba(255,255,255,0.2)",
        mr: 1
      }} 
    />
  );
}

/* ================= MODAL COMPONENT ================= */

function PokemonDetailModal({ open, onClose, pokemon }: any) {
  const [showCard, setShowCard] = useState(false);
  const type = pokemon?.type1?.toLowerCase() || "normal";
  const themeColor = TYPE_COLORS[type] || "#ffffff";
  const [showBall, setShowBall] = useState(false);

  const getAnimationType = () => {
    if (["fire", "electric", "dragon"].includes(type)) return "type-flicker 2s infinite alternate";
    if (["water", "ice", "flying", "psychic"].includes(type)) return "type-float 6s ease-in-out infinite alternate";
    if (["ghost", "dark", "poison"].includes(type)) return "type-pulse 4s ease-in-out infinite alternate";
    return "type-drift 8s linear infinite alternate";
  };

  useEffect(() => {
    if (open) {
      setShowBall(true);
      setShowCard(false);
      const ballTimer = setTimeout(() => {
        setShowBall(false);
        setShowCard(true);
      }, 700);
      return () => clearTimeout(ballTimer);
    }
  }, [open]);

  if (!pokemon) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { background: "transparent", boxShadow: "none", overflow: "visible" } }}
      BackdropProps={{ sx: { backdropFilter: "blur(20px)", backgroundColor: "rgba(0,0,0,0.8)" } }}
    >
      <DialogContent sx={{ display: "flex", justifyContent: "center", p: 0, overflow: "visible", position: "relative" }}>
        
        {showBall && (
          <Box sx={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <Box component="img" src="/images/pokeball.png" sx={{ width: 90, animation: "pokeball-fly 1.2s ease-out forwards" }} />
          </Box>
        )}

        {showCard && (
          <>
            <Box sx={{ position: "fixed", inset: 0, zIndex: -1, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              <Box sx={{ width: "100vw", height: "100vh", background: `radial-gradient(circle at center, ${themeColor}44 0%, transparent 70%)`, filter: "blur(100px)", animation: `${getAnimationType()}, fadeIn 0.5s ease-out` }} />
            </Box>
            {type === "fire" && <FireBackground />}
            {type === "grass" && <GrassBackground />}
          </>
        )}

        {showCard && (
          <Box sx={{ width: 850, minHeight: 600, maxHeight: "80vh", display: "flex", flexDirection: "column", borderRadius: 8, position: "relative", overflow: "hidden", background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))", backdropFilter: "blur(25px) saturate(160%)", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", zIndex: 1, animation: "fadeIn 0.4s ease-out forwards" }}>
            
            <Box sx={{ position: "absolute", top: "-15%", left: "15%", width: "70%", height: "50%", background: themeColor, filter: "blur(120px)", opacity: 0.35, zIndex: 0, animation: getAnimationType() }} />

            <IconButton onClick={onClose} sx={{ position: "absolute", right: 20, top: 20, color: "#fff", zIndex: 10 }}>
              <CloseIcon />
            </IconButton>

            <Box sx={{ pt: 2, pl: 3, pb: 2, zIndex: 1, display: "flex", gap: 4, position: "relative" }}>
              <Typography variant="h5" sx={{ opacity: 0.3, fontWeight: 600, transform: "rotate(270deg)", transformOrigin: "left top", position: "absolute", top: "85%" }}>#{String(pokemon.id).padStart(3, "0")}</Typography>
              <Divider orientation="vertical" flexItem sx={{ opacity: 0.5, ml: 4 }} />
              <Typography variant="h2" fontWeight={900} sx={{ textTransform: "capitalize", letterSpacing: -2, lineHeight: 0.9 }}>{pokemon.name}</Typography>
            </Box>

            <Divider sx={{ mx: 5, borderColor: "rgba(255,255,255,0.1)" }} />

            <Box sx={{ display: "flex", flex: 1, zIndex: 1 }}>
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", p: 4, pt: 2, background: "rgba(255,255,255,0.02)" }}>
                <Box sx={{ width: "100%", height: "240px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img 
                    src={`/images/${pokemon.name}_new.png`} 
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))" }} 
                    alt={pokemon.name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/images/Q.png";
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", mt: 3 }}>
                  <GlassChip label={pokemon.type1} />
                  {pokemon.type2 && <GlassChip label={pokemon.type2} isSecondary />}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, opacity: 0.5, textTransform: "uppercase", mt: 1 }}>{pokemon.species}</Typography>
                <Box sx={{ mt: 3, p: 2, borderRadius: 4, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', width: '100%' }}>
                  <TableRowItem label="Height" value={pokemon.height} />
                  <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.05)' }} />
                  <TableRowItem label="Weight" value={pokemon.weight} />
                  <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.05)' }} />
                  <TableRowItem label="Gender" value={pokemon.gender} />
                </Box>
              </Box>

              <Box sx={{ flex: 1.4, p: 3, pt: 0, borderLeft: "1px solid rgba(255,255,255,0.1)", overflowY: "auto" }}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="overline" sx={{ fontWeight: 900, opacity: 0.5, display: "block", mb: 1 }}>Base Stats</Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                    <StatRow label="HP" val={pokemon.hpBase} min={pokemon.hpMin} max={pokemon.hpMax} />
                    <StatRow label="ATK" val={pokemon.attackBase} min={pokemon.attackMin} max={pokemon.attackMax} />
                    <StatRow label="DEF" val={pokemon.defenseBase} min={pokemon.defenseMin} max={pokemon.defenseMax} />
                    <StatRow label="SPA" val={pokemon.spAttackBase} min={pokemon.spAttackMin} max={pokemon.spAttackMax} />
                    <StatRow label="SPD" val={pokemon.spDefenseBase} min={pokemon.spDefenseMin} max={pokemon.spDefenseMax} />
                    <StatRow label="SPE" val={pokemon.speedBase} min={pokemon.speedMin} max={pokemon.speedMax} />
                  </Box>
                </Box>
                <Typography variant="overline" sx={{ fontWeight: 900, opacity: 0.5, display: "block", mb: 1 }}>Training</Typography>
                <Box sx={{ p: 2, borderRadius: 4, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <TableRowItem label="Abilities" value={pokemon.abilities} />
                  <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.05)' }} />
                  <TableRowItem label="Catch Rate" value={pokemon.catchRate} />
                  <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.05)' }} />
                  <TableRowItem label="Growth" value={pokemon.growthRate} />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ================= MAIN COMPONENT ================= */

export default function PokemonCard({ pokemon }: { pokemon: any }) {
  const [open, setOpen] = useState(false);
  const themeColor = TYPE_COLORS[pokemon.type1.toLowerCase()] || "#fff";

  return (
    <>
      <Card 
        onClick={() => setOpen(true)} 
        sx={{ 
          width: 320, height: 120, cursor: "pointer", borderRadius: 4, 
          background: `linear-gradient(135deg, #0a0e17 0%, ${themeColor}15 100%)`, 
          border: `1px solid ${themeColor}44`, display: "flex", alignItems: "center", p: 1.5, gap: 2, transition: "0.3s", overflow: "hidden",
          "&:hover": { transform: "translateY(-6px)", border: `1px solid ${themeColor}`, boxShadow: `0 12px 30px ${themeColor}33` } 
        }}
      >
        <Box sx={{ width: 90, height: 90, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CardMedia 
            component="img" 
            image={`/images/${pokemon.name}_new.png`} 
            sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/images/Q.png";
            }}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography fontWeight={800} variant="h6" sx={{ color: "#fff", textTransform: "capitalize", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{pokemon.name}</Typography>
          <Box sx={{ display: 'flex', mt: 1 }}>
            <Chip 
              label={pokemon.type1.toUpperCase()} 
              size="small" 
              sx={{ bgcolor: themeColor, color: "#000", fontWeight: "bold", mr: 1 }} 
            />
            {pokemon.type2 && (
              <Chip 
                label={pokemon.type2.toUpperCase()} 
                size="small" 
                sx={{ bgcolor: TYPE_COLORS[pokemon.type2.toLowerCase()], color: "#000", fontWeight: "bold" }} 
              />
            )}
          </Box>
        </Box>
      </Card>

      <PokemonDetailModal open={open} onClose={() => setOpen(false)} pokemon={pokemon} />
        
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes pokeball-fly { 0% { transform: translate(10vw, -35vh) scale(0.4) rotate(0deg); opacity: 1; } 70% { transform: translate(0, -15vh) scale(0.9) rotate(360deg); } 100% { transform: translate(0, 0) scale(1.1) rotate(720deg); opacity: 0; } }
        @keyframes type-flicker { 0% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.1); } 100% { opacity: 0.2; transform: scale(1); } }
        @keyframes type-float { 0% { transform: translate(0, 0); } 50% { transform: translate(2%, 5%); } 100% { transform: translate(-2%, 2%); } }
        @keyframes type-pulse { 0% { transform: scale(0.8); opacity: 0.1; } 100% { transform: scale(1.4); opacity: 0.4; } }
        @keyframes type-drift { 0% { transform: translateX(-5%); } 100% { transform: translateX(5%); } }
      `}</style>
    </>
  );
}