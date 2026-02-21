'use client'

import { CheckIcon, ListIcon } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import styled, { css } from 'styled-components'

import { useFlyout } from '@/components/shared/FlyoutProvider'
import { NavBar } from '@/components/shared/NavBar'
import { Toast } from '@/components/shared/Toast'

import { COLORS } from '@/constants'

type Props = {
  name: string
  children: React.ReactNode
  layout?: 'standard' | 'settings'
}

export function Shell({ children, name, layout = 'standard' }: Props) {
  const router = useRouter()
  const { showFlyout } = useFlyout()

  function handleMenuClick() {
    if (layout === 'settings') {
      router.push('/me')
    } else {
      showFlyout()
    }
  }

  return (
    <>
      <Page $layout={layout}>
        <PageHeader>
          <PageTitle>{name}</PageTitle>
          <MenuButton onClick={handleMenuClick}>
            {layout === 'settings' ? (
              <CheckIcon color={COLORS.text.primary} size={32} />
            ) : (
              <ListIcon color={COLORS.text.primary} size={32} />
            )}
          </MenuButton>
        </PageHeader>
        <PageBody>{children}</PageBody>
        {layout === 'standard' ? <NavBar /> : undefined}
      </Page>
      <Toast />
    </>
  )
}

const StandardLayout = css`
  grid-template-rows: 9rem auto 9rem;
  grid-template-areas:
    'PageHeader'
    'PageBody'
    'NavBar';
`

const SettingsLayout = css`
  grid-template-rows: 9rem auto;
  grid-template-areas:
    'PageHeader'
    'PageBody';
`

const Page = styled.div<{ $layout: 'settings' | 'standard' }>`
  display: grid;
  width: 100dvw;
  height: 100dvh;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  ${({ $layout }) => ($layout === 'standard' ? StandardLayout : SettingsLayout)}
`

const PageHeader = styled.header`
  grid-area: PageHeader;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border-bottom: ${COLORS.border.width} solid ${COLORS.border.primary}; */
  padding-left: 3rem;
`

const PageTitle = styled.h1`
  color: ${COLORS.text.primary};
  font-size: 3rem;
  letter-spacing: -0.01em;
`

const PageBody = styled.div`
  grid-area: PageBody;
  background: linear-gradient(
    180deg,
    ${COLORS.bg.primary} 0%,
    ${COLORS.bg.secondary} 100%
  );
  overflow-y: auto;
  overflow-x: hidden;
`

const MenuButton = styled.button`
  width: 9rem;
  height: 9rem;
  border: none;
  background-color: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
