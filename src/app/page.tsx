"use client";

import { useState, useMemo, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PokemonCard from "@/components/PokemonCard";
import PokedexNavbar from "@/components/PokedexNavbar";

type Pokemon = {
  id: number;
  name: string;
  type1: string;
  type2?: string | null;
  species: string;
  height: string;
  weight: string;
  abilities: string;
  hpBase: number;
  attackBase: number;
  defenseBase: number;
  spAttackBase: number;
  spDefenseBase: number;
  speedBase: number;
};

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  // Fetch Pokémon from API
  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch("/api/pokemon");
      const data = await res.json();
      console.log(data);
      
      setPokemon(data);
      setLoading(false);
    };
    fetchPokemon();
  }, []);

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase());

      const matchType =
        !type ||
        p.type1.toLowerCase() === type ||
        p.type2?.toLowerCase() === type;

      return matchSearch && matchType;
    });
  }, [pokemon, search, type]);

  if (loading) return null;

  return (
    <>
      <PokedexNavbar
        onSearch={setSearch}
        onTypeChange={setType}
      />

      <Grid container spacing={3} sx={{ p: 3, justifyContent: "center" }}>
        {filteredPokemon.map((p) => (
          <Box key={p.id}>
            <PokemonCard pokemon={p} />
          </Box>
        ))}
      </Grid>

    </>
  );
}
