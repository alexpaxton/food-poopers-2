"use client";

import { ChangeEventHandler } from "react";
import styled from "styled-components";

type InputProps = {
  name: string;
  type: "text" | "password" | "number";
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  min?: string;
  step?: string;
};

export function Input({
  name,
  type,
  value,
  onChange,
  placeholder,
  min,
  step,
}: InputProps) {
  return (
    <InputContainer>
      <InputElement
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        min={min}
        step={step}
        onChange={onChange}
      />
      <InputGlow />
    </InputContainer>
  );
}

const InputElement = styled.input`
  width: 100%;
  height: 5rem;
  border-radius: 0.5rem;
  background-color: #fff;
  padding: 0 1.5rem;
  color: #000;
  border: 2px solid #eee;
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;
  outline: none;
  position: relative;
  z-index: 2;

  &:hover {
    border-color: #000;
  }

  &:focus {
    background-color: #fff;
    border-color: #000;
  }
`;

const InputGlow = styled.div`
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(100% + 1rem);
  height: calc(100% + 1rem);
  transform: translate3d(-50%, -50%, 0);
  background: linear-gradient(
    90deg,
    rgba(0, 183, 255, 1) 0%,
    rgba(186, 140, 255, 1) 100%
  );
  border-radius: 1rem;
  opacity: 0;
  transition: opacity 0.25s ease;
`;

const InputContainer = styled.div`
  height: 5rem;
  width: 100%;
  position: relative;

  &:focus-within ${InputGlow} {
    opacity: 0.5;
  }
`;
