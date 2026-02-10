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
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  grid-template-rows: 90px auto 90px;
  grid-template-areas: 'PageHeader'
  'PageBody'
  'NavBar';
`

const PageHeader = styled.header`
  grid-area: PageHeader;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const PageTitle = styled.h1`
  color: #000;
`

const PageBody = styled.div`
  grid-area: PageBody;
  background-color: #ccc;
`