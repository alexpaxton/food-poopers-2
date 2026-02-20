"use client";

import styled from "styled-components";

export const Button = styled.button`
  height: 5rem;
  padding: 0;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 0.75rem;
  font-size: 1.5rem;
  font-weight: 800;
  cursor: pointer;
  transition: opacity 0.25s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
