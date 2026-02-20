"use client";

import { PoopArtProps } from "@/components/drop-a-log/poop-art/shared";
import { Type1 } from "@/components/drop-a-log/poop-art/Type1";
import { Type2 } from "@/components/drop-a-log/poop-art/Type2";
import { Type3 } from "@/components/drop-a-log/poop-art/Type3";
import { Type4 } from "@/components/drop-a-log/poop-art/Type4";
import { Type5 } from "@/components/drop-a-log/poop-art/Type5";
import { Type6 } from "@/components/drop-a-log/poop-art/Type6";
import { Type7 } from "@/components/drop-a-log/poop-art/Type7";

export const POOP_ART: Record<number, React.FunctionComponent<PoopArtProps>> = {
  1: Type1,
  2: Type2,
  3: Type3,
  4: Type4,
  5: Type5,
  6: Type6,
  7: Type7,
};
