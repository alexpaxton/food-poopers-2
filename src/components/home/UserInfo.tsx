'use client';

import { signOut } from 'next-auth/react';
import styled from 'styled-components';

interface UserInfoProps {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export function UserInfo({ name, email, image }: UserInfoProps) {
  return (
    <Container>
      {image && <Avatar src={image} alt={name ?? 'User'} />}
      <span>{name ?? email}</span>
      <SignOutButton onClick={() => signOut()}>Sign out</SignOutButton>
    </Container>
  );
}

const Container = styled.div`
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
