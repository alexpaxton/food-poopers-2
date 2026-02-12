"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { Shell } from "@/components/shared/Shell";

import { LogForm } from "@/components/drop-a-log/LogForm";

export default function DropALogPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") return null;

  return (
    <Shell name="Drop a log">
      <LogForm />
    </Shell>
  );
}
