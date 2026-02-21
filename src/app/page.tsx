import { redirect } from 'next/navigation'
import styled from 'styled-components'

import { SignInButton } from '@/components/home/SignInButton'

import { auth } from '@/auth'

export default async function Home() {
  const session = await auth()

  if (session) {
    redirect('/onboarding')
  }

  return (
    <Main>
      <SignInButton />
    </Main>
  )
}

const Main = styled.main`
  width: 100dvw;
  height: 100dvh;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`
