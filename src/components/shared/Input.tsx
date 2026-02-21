'use client'

import { ChangeEventHandler, FocusEventHandler } from 'react'
import styled from 'styled-components'

import { COLORS } from '@/constants'

type InputProps = {
  name: string
  type: 'text' | 'password' | 'number'
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  placeholder?: string
  min?: string
  step?: string
  maxLength?: number
  disabled?: boolean
}

export function Input({
  name,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  min,
  step,
  maxLength = 2000,
  disabled,
}: InputProps) {
  return (
    <InputContainer>
      <InputElement
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        min={min}
        step={step}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        disabled={disabled}
      />
      <InputGlow />
    </InputContainer>
  )
}

const InputElement = styled.input`
  width: 100%;
  height: 5rem;
  border-radius: 0.75rem;
  background-color: ${COLORS.bg.primary};
  padding: 0 1.5rem;
  color: ${COLORS.text.primary};
  border: ${COLORS.border.width} solid ${COLORS.border.primary};
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;
  outline: none;
  position: relative;
  z-index: 2;

  &:hover,
  &:focus {
    border-color: ${COLORS.border.selected};
  }

  &:disabled {
    background-color: ${COLORS.bg.secondary};
    border-color: ${COLORS.border.primary};
    color: ${COLORS.text.secondary};
  }
`

const InputGlow = styled.div`
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(100% + 1rem);
  height: calc(100% + 1rem);
  transform: translate3d(-50%, -50%, 0);
  background: linear-gradient(
    90deg,
    ${COLORS.glow.start} 0%,
    ${COLORS.glow.stop} 100%
  );
  border-radius: 1rem;
  opacity: 0;
  transition: opacity 0.25s ease;
`

const InputContainer = styled.div`
  height: 5rem;
  width: 100%;
  position: relative;

  &:focus-within ${InputGlow} {
    opacity: ${COLORS.glow.opacity};
  }
`
