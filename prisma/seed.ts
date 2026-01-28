import { PrismaClient } from "@prisma/client";
import fs from "fs";
import csv from "csv-parser";

const prisma = new PrismaClient();

async function main() {
  const rows: any[] = [];

  fs.createReadStream("C:/Users/shash/OneDrive/Desktop/CSE 2K22 internship certificate/archive/pokemonDB_dataset.csv")
    .pipe(csv())
    .on("data", (data) => rows.push(data))
    .on("end", async () => {
      for (const p of rows) {
        await prisma.pokemon.create({
          data: {
            name: p.name,
            type1: p.type1,
            type2: p.type2 || null,
            species: p.species,
            height: p.height,
            weight: p.weight,
            abilities: p.abilities,
            evYield: p.evYield,
            catchRate: p.catchRate,
            baseFriendship: p.baseFriendship,
            baseExp: Number(p.baseExp),
            growthRate: p.growthRate,
            eggGroups: p.eggGroups,
            gender: p.gender,
            eggCycles: p.eggCycles,
            hpBase: Number(p.hpBase),
            hpMin: Number(p.hpMin),
            hpMax: Number(p.hpMax),
            attackBase: Number(p.attackBase),
            attackMin: Number(p.attackMin),
            attackMax: Number(p.attackMax),
            defenseBase: Number(p.defenseBase),
            defenseMin: Number(p.defenseMin),
            defenseMax: Number(p.defenseMax),
            spAttackBase: Number(p.spAttackBase),
            spAttackMin: Number(p.spAttackMin),
            spAttackMax: Number(p.spAttackMax),
            spDefenseBase: Number(p.spDefenseBase),
            spDefenseMin: Number(p.spDefenseMin),
            spDefenseMax: Number(p.spDefenseMax),
            speedBase: Number(p.speedBase),
            speedMin: Number(p.speedMin),
            speedMax: Number(p.speedMax),
          },
        });
      }

      console.log("✅ Pokémon imported");
      process.exit(0);
    });
}

main();