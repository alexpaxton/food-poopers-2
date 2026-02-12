'use client';

import { useSession } from 'next-auth/react';
import styled from 'styled-components';

export function Avatar() {
  const {data, status } = useSession({required: true});

  if (status === 'loading' || data === null) {
    return <EmptyCircle />
  }

  if (data.user === undefined) {
    return <EmptyCircle />
  }

  if (data.user.image === undefined || data.user.image === null) {
    return <EmptyCircle />
  }

  return (
    <Circle src={data.user.image} />
  )
}

const Circle = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

const EmptyCircle = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #333;
`;