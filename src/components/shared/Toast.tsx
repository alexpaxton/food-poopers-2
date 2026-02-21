'use client'

import { XIcon } from '@phosphor-icons/react'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled, { css } from 'styled-components'

import { useToasts } from '@/components/shared/ToastProvider'

import { COLORS } from '@/constants'

import { ToastType } from '@/types'

export function Toast() {
  const nodeRef = useRef<HTMLDivElement>(null)
  const { toast, dismiss } = useToasts()
  const toastExists = toast.dismissed === false

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={toastExists}
      timeout={300}
      classNames="toast"
      unmountOnExit={true}
    >
      <Card
        ref={nodeRef}
        $type={toast.type || 'info'}
        onClick={dismiss}
        $fullScreen={toast.fullScreen || false}
      >
        {toast.emoji && <Emoji>{toast.emoji}</Emoji>}
        <Message>
          <Heading>{toast.heading}</Heading>
          {toast.body && <Body>{toast.body}</Body>}
        </Message>
        <X weight="regular" color={COLORS.text.primary} size={32} />
      </Card>
    </CSSTransition>
  )
}

const CARD_THEME: Record<ToastType, string> = {
  success: COLORS.toast.success,
  info: COLORS.toast.info,
  error: COLORS.toast.error,
}

const Message = styled.div`
  display: flex;
  flex-direction: column;
`

const Heading = styled.p`
  letter-spacing: -0.01em;
  font-weight: 700;
`

const Body = styled.p`
  font-weight: 400;
`

const Emoji = styled.span`
  display: inline-block;
`

const X = styled(XIcon)`
  position: absolute;
  top: 3rem;
  right: 3rem;
`

const CompactStyles = css`
  display: grid;
  grid-template-columns: 6rem 1fr;
  grid-template-areas: 'emoji message';
  gap: 2rem;

  ${Emoji} {
    display: flex;
    font-size: 5rem;
    align-items: center;
    justify-content: center;
  }

  ${Heading} {
    font-size: 2.5rem;
  }

  ${Body} {
    font-size: 2rem;
  }
`

const FullScreenStyles = css`
  display: flex;
  flex-direction: column;
  bottom: 1.5rem;
  text-align: center;
  justify-content: center;
  gap: 1rem;

  ${Emoji} {
    font-size: 16rem;
  }

  ${Heading} {
    font-size: 3rem;
  }

  ${Body} {
    font-size: 2rem;
  }

  ${Message} {
    gap: 1.5rem;
  }
`

const Card = styled.div<{ $type: ToastType; $fullScreen: boolean }>`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  ${({ $fullScreen }) => ($fullScreen ? FullScreenStyles : CompactStyles)}
  height: auto;
  background: ${({ $type }) => CARD_THEME[$type]};
  padding: 3rem;
  border-radius: 1rem;
  z-index: 9999;

  &.toast-enter {
    transform: translateY(-3rem);
    opacity: 0;
  }
  &.toast-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 200ms cubic-bezier(0.16, 1, 0.3, 1),
      transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &.toast-exit {
    opacity: 1;
    transform: translateY(0);
  }
  &.toast-exit-active {
    opacity: 0;
    transform: translateY(-3rem);
    transition:
      opacity 200ms cubic-bezier(0.7, 0, 0.84, 0),
      transform 200ms cubic-bezier(0.7, 0, 0.84, 0);
  }
`
