"use client";

import { ChangeEventHandler } from "react";
import styled from "styled-components";

import { COLORS } from "@/constants";

type TextAreaProps = {
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
};

export function TextArea({
  name,
  value,
  onChange,
  placeholder,
}: TextAreaProps) {
  return (
    <TextAreaContainer>
      <TextAreaElement
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        maxLength={2400}
      />
      <TextAreaGlow />
    </TextAreaContainer>
  );
}

const TextAreaElement = styled.textarea`
  font-family:
    Nunito,
    Nunito Fallback;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  height: 11rem;
  min-height: 11rem;
  max-height: 11rem;
  border-radius: 0.75rem;
  background-color: ${COLORS.bg.primary};
  padding: 1.5rem;
  color: ${COLORS.text.primary};
  border: ${COLORS.border.width} solid ${COLORS.border.primary};
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;
  outline: none;
  position: relative;
  z-index: 2;

  &:hover,
  &:focus {
    border-color: ${COLORS.border.selected};
  }
`;

const TextAreaGlow = styled.div`
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(100% + 1rem);
  height: calc(100% + 1rem);
  transform: translate3d(-50%, -50%, 0);
  background: linear-gradient(
    90deg,
    ${COLORS.glow.start} 0%,
    ${COLORS.glow.stop} 100%
  );
  border-radius: 1rem;
  opacity: 0;
  transition: opacity 0.25s ease;
`;

const TextAreaContainer = styled.div`
  height: 11rem;
  width: 100%;
  position: relative;

  &:focus-within ${TextAreaGlow} {
    opacity: ${COLORS.glow.opacity};
  }
`;
