'use client'

import styled, { css, RuleSet } from 'styled-components'

import { COLORS } from '@/constants'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'

type Props = {
  text: string
  onClick: () => void
  type?: 'button' | 'submit'
  loading?: boolean
  variant: ButtonVariant
  disabled?: boolean
  icon?: React.ReactElement
}

export function Button({
  text,
  onClick,
  type = 'button',
  variant,
  disabled = false,
  icon,
  loading = false,
}: Props) {
  return (
    <Element
      onClick={onClick}
      type={type}
      disabled={disabled}
      $variant={variant}
    >
      {text}
      {icon}
    </Element>
  )
}

const PrimaryButton = css`
  background: ${COLORS.button.primary.bg};
  color: ${COLORS.button.primary.text};
  border: none;
`

const SecondaryButton = css`
  background: ${COLORS.button.secondary.bg};
  color: ${COLORS.button.secondary.text};
  border: none;
`

const TertiaryButton = css`
  background: ${COLORS.button.tertiary.bg};
  color: ${COLORS.button.tertiary.text};
  border: ${COLORS.border.width} solid ${COLORS.button.tertiary.border};
`

const BUTTON_STYLES: Record<ButtonVariant, RuleSet> = {
  primary: PrimaryButton,
  secondary: SecondaryButton,
  tertiary: TertiaryButton,
}

const Element = styled.button<{ $variant: ButtonVariant }>`
  height: 5rem;
  padding: 0 2rem;
  border-radius: 0.75rem;
  font-size: 2rem;
  font-weight: 800;
  cursor: pointer;
  transition: opacity 0.25s;
  ${({ $variant }) => BUTTON_STYLES[$variant]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
