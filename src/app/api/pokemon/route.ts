import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pokemon = await prisma.pokemon.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(pokemon);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pokemon" },
      { status: 500 }
    );
  }
}
