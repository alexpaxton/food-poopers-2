"use client";

import styled, { keyframes } from "styled-components";

import { COLORS } from "@/constants";

export function Spinner() {
  return <Ring />;
}

const SpinAnimation = keyframes`
  from {
    transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }
  to {
    transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
`;

const Ring = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: ${COLORS.border.width} solid ${COLORS.text.primary};
  border-top-color: transparent;
  transform: translate3d(-50%, -50%, 0);
  top: 50%;
  left: 50%;
  position: absolute;
  animation: 1s infinite linear ${SpinAnimation};
`;
