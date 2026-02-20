"use client";

import { signIn } from "next-auth/react";
import styled from "styled-components";

export function SignInButton() {
  return (
    <GoogleButton onClick={() => signIn("google", { redirectTo: "/me" })}>
      Sign in with Google
    </GoogleButton>
  );
}

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #3c4043;
  background: #fff;
  border: 1px solid #dadce0;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background 0.2s,
    box-shadow 0.2s;

  &:hover {
    background: #f8f9fa;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;
