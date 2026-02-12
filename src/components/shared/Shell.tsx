'use client'

import styled from 'styled-components';
import { NavBar } from './NavBar';

type Props = {
  name: string;
  children: React.ReactNode;
}

export function Shell({children, name}: Props) {
  return (
    <Page>
      <PageHeader>
        <PageTitle>{name}</PageTitle>
      </PageHeader>
      <PageBody>
        {children}
      </PageBody>
      <NavBar />
    </Page>
  )
}

const Page = styled.div`
  display: grid;
  width: 100dvw;
  height: 100dvh;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  grid-template-rows: 9rem auto 9rem;
  grid-template-areas: 'PageHeader'
  'PageBody'
  'NavBar';
`

const PageHeader = styled.header`
  grid-area: PageHeader;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  padding-left: 3rem;
`

const PageTitle = styled.h1`
  color: #000;
  font-size: 3rem;
  letter-spacing: -0.01em;
`

const PageBody = styled.div`
  grid-area: PageBody;
  background-color: #fff;
  overflow-y: auto;
`