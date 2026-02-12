"use client";

import { useSession, signIn } from "next-auth/react";
import styled from "styled-components";
import { Me } from "@/components/home/Me";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <Main>
      {status === "loading" && null}
      {status === "unauthenticated" && (
        <GoogleButton onClick={() => signIn("google")}>
          Sign in with Google
        </GoogleButton>
      )}
      {status === "authenticated" && session.user && (
        <Me
          name={session.user.name}
          email={session.user.email}
          image={session.user.image}
        />
      )}
    </Main>
  );
}

const Main = styled.main`
  width: 100dvw;
  height: 100dvh;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;

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
