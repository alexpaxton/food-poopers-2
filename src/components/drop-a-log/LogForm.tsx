"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";

import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";

import { Carousel } from "@/components/drop-a-log/Carousel";

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

const COLORS: { label: string; hex: string }[] = [
  { label: "Brown", hex: "#7B3F00" },
  { label: "Green", hex: "#4CAF50" },
  { label: "Yellow", hex: "#FDD835" },
  { label: "Black", hex: "#212121" },
  { label: "Red", hex: "#E53935" },
  { label: "White", hex: "#F5F5F5" },
  { label: "Orange", hex: "#FB8C00" },
];

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
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [locationError, setLocationError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: postPoop,
    onSuccess: () => {
      setForm(INITIAL_FORM_STATE);
    },
  });

  function handleSelectStool(type: number) {
    console.log("handleSelectStool", type);
    setForm((f) => ({ ...f, type }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.type) return;

    setLocationError(null);

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
      () => {
        setLocationError(
          "Unable to get location. Please allow location access and try again.",
        );
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label>Color</Label>
        <ColorGrid>
          {COLORS.map(({ label, hex }) => (
            <ColorButton
              key={label}
              type="button"
              $hex={hex}
              $selected={form.color === label}
              onClick={() => setForm((f) => ({ ...f, color: label }))}
              title={label}
            >
              <ColorLabel $selected={form.color === label}>{label}</ColorLabel>
            </ColorButton>
          ))}
        </ColorGrid>
      </Field>

      <Field>
        <Label>Bristol Type</Label>
        <Carousel onSelect={handleSelectStool} />
      </Field>

      <Field>
        <SpicyLabel>
          <Checkbox
            type="checkbox"
            checked={form.spicy}
            onChange={(e) =>
              setForm((f) => ({ ...f, spicy: e.target.checked }))
            }
          />
          Spicy
        </SpicyLabel>
      </Field>

      <Field>
        <Label>Weight (lbs) — optional</Label>
        <Input
          value={form.weight}
          onChange={(e) => setForm((f) => ({ ...f, weight: e.target.value }))}
          name="Weight"
          type="number"
          placeholder="Enter weight in lbs"
          step="0.1"
          min="0"
        />
        {/* <Input
          type="number"
          min="0"
          step="0.1"
          value={form.weight}
          onChange={(e) => setForm((f) => ({ ...f, weight: e.target.value }))}
          
        /> */}
      </Field>

      <Field>
        <Label>Notes — optional</Label>
        <Textarea
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          placeholder="Anything worth noting?"
          rows={3}
        />
      </Field>

      {locationError && <ErrorText>{locationError}</ErrorText>}
      {mutation.isError && (
        <ErrorText>Something went wrong. Please try again.</ErrorText>
      )}
      {mutation.isSuccess && <SuccessText>Poop logged!</SuccessText>}

      <Button
        type="submit"
        disabled={!form.color || !form.type || mutation.isPending}
      >
        {mutation.isPending ? "Locating…" : "Drop a log"}
      </Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 3rem;
  width: 100%;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
`;

const Textarea = styled.textarea`
  padding: 0.625rem 0.75rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: #000;
  }
`;

const ColorGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ColorButton = styled.button<{ $hex: string; $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem;
  border-radius: 8px;
  border: 2px solid ${({ $selected }) => ($selected ? "#000" : "transparent")};
  background: none;
  cursor: pointer;
  transition: border-color 0.15s;

  &::before {
    content: "";
    display: block;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: ${({ $hex }) => $hex};
    border: 1px solid rgba(0, 0, 0, 0.12);
  }

  &:hover {
    border-color: #000;
  }
`;

const ColorLabel = styled.span<{ $selected: boolean }>`
  font-size: 0.6875rem;
  font-weight: ${({ $selected }) => ($selected ? "600" : "400")};
  color: #333;
`;

const SpicyLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 1.125rem;
  height: 1.125rem;
  cursor: pointer;
`;

const ErrorText = styled.p`
  font-size: 0.875rem;
  color: #c0392b;
`;

const SuccessText = styled.p`
  font-size: 0.875rem;
  color: #27ae60;
`;
