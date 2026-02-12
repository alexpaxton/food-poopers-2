import { Poop } from "@prisma/client";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { auth } from "@/auth";

type FormPoop = Omit<Poop, "id" | "createdAt">;

export const POST = auth(async (req) => {
  if (!req.auth?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as FormPoop;
  const { color, spicy, type, latitude, longitude, weight, notes } = body;

  if (
    typeof color !== "string" ||
    typeof spicy !== "boolean" ||
    typeof type !== "number" ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const poop = await prisma.poop.create({
    data: {
      color,
      spicy,
      type,
      latitude,
      longitude,
      weight,
      notes,
      userId: req.auth.user.id,
    },
  });

  return NextResponse.json(poop, { status: 201 });
});
