'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import styled from 'styled-components';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
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
  transition: background 0.2s, box-shadow 0.2s;

  &:hover {
    background: #f8f9fa;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
`;

const SignOutButton = styled.button`
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
  color: #666;
  background: transparent;
  border: 1px solid #dadce0;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #f8f9fa;
  }
`;

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <Main>
      <Title>food-poopers-2</Title>

      {status === 'loading' && null}

      {status === 'unauthenticated' && (
        <GoogleButton onClick={() => signIn('google')}>
          Sign in with Google
        </GoogleButton>
      )}

      {status === 'authenticated' && session.user && (
        <UserInfo>
          {session.user.image && (
            <Avatar src={session.user.image} alt={session.user.name ?? 'User'} />
          )}
          <span>{session.user.name ?? session.user.email}</span>
          <SignOutButton onClick={() => signOut()}>Sign out</SignOutButton>
        </UserInfo>
      )}
    </Main>
  );
}
