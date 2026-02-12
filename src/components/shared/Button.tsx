"use client";

import styled from "styled-components";

export const Button = styled.button`
  height: 5rem;
  padding: 0;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
