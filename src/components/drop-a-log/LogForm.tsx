"use client";

import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";

import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { TextArea } from "@/components/shared/TextArea";
import { useToasts } from "@/components/shared/ToastProvider";

import { Carousel } from "@/components/drop-a-log/Carousel";
import { ColorPicker } from "@/components/drop-a-log/ColorPicker";
import { SpicyToggle } from "@/components/drop-a-log/SpicyToggle";
import { TypePicker } from "@/components/drop-a-log/TypePicker";

import { useLocalStorage } from "@/hooks";

type FormState = {
  color: string;
  spicy: boolean;
  type: number;
  weight: string;
  notes: string;
};

const INITIAL_FORM_STATE: FormState = {
  color: "Brown",
  spicy: false,
  type: 4,
  weight: "",
  notes: "",
};

async function postPoop(data: {
  color: string;
  spicy: boolean;
  type: number;
  latitude: number;
  longitude: number;
  weight: number | null;
  notes: string | null;
}) {
  const res = await fetch("/api/poops", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit");
  return res.json();
}

export function LogForm() {
  const { value: form, setValue: setForm } = useLocalStorage<FormState>({
    initialValue: INITIAL_FORM_STATE,
    key: "log-form",
  });
  const { notify } = useToasts();

  const mutation = useMutation({
    mutationFn: postPoop,
    onSuccess: () => {
      notify({
        type: "success",
        heading: "Yeehaw!",
        body: `Excellent shid pardner`,
        dismissable: true,
        fullScreen: true,
        emoji: "💩",
      });
      setForm(INITIAL_FORM_STATE);
    },
    onError: () => {
      notify({
        type: "error",
        heading: "Oh no",
        body: "Something went wrong. Please try again.",
        dismissable: true,
        fullScreen: false,
        emoji: "🫠",
      });
    },
  });

  function handleSelectType(type: number) {
    console.log("handleSelectType", type);
    setForm((f) => ({ ...f, type }));
  }

  function handleSelectColor(color: string) {
    setForm((f) => ({ ...f, color }));
  }

  function handleToggleSpicy(spicy: boolean) {
    setForm((f) => ({ ...f, spicy }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.type) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        mutation.mutate({
          color: form.color,
          spicy: form.spicy,
          type: form.type,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          weight: form.weight !== "" ? parseFloat(form.weight) : null,
          notes: form.notes !== "" ? form.notes : null,
        });
      },
      () =>
        notify({
          type: "error",
          heading: "Unable to get location",
          body: "Please allow location access and try again.",
          dismissable: true,
          fullScreen: false,
          emoji: "🌎",
        }),
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Carousel
        onSelect={handleSelectType}
        selectedType={form.type}
        color={form.color}
        spicy={form.spicy}
      />
      <TypePicker onSelect={handleSelectType} selectedType={form.type} />
      <ColorPicker onSelect={handleSelectColor} selectedColor={form.color} />
      <TwoColumns>
        <SpicyToggle spicy={form.spicy} onToggleSpicy={handleToggleSpicy} />
        <Input
          value={form.weight}
          onChange={(e) => setForm((f) => ({ ...f, weight: e.target.value }))}
          name="Weight"
          type="number"
          placeholder="Weight in lbs"
          step="0.1"
          min="0"
        />
      </TwoColumns>
      <OneColumn>
        <TextArea
          name="Notes"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          placeholder="Anything worth noting?"
        />
        <Button
          type="submit"
          disabled={!form.color || !form.type || mutation.isPending}
        >
          {mutation.isPending ? "Locating…" : "Drop a log"}
        </Button>
      </OneColumn>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100dvw;
  padding: 3rem 0;
`;

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  gap: 3rem;
  padding: 0 3rem;
`;

const OneColumn = styled.div`
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
