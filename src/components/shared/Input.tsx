'use client'

import { ChangeEventHandler, FocusEventHandler } from 'react'
import styled from 'styled-components'

import {
  fieldContainerStyles,
  fieldElementStyles,
  FieldGlow,
} from '@/components/shared/fieldStyles'

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
      <FieldGlow />
    </InputContainer>
  )
}

const InputElement = styled.input`
  ${fieldElementStyles}
  height: 5rem;
  padding: 0 1.5rem;
`

const InputContainer = styled.div`
  ${fieldContainerStyles}
  height: 5rem;
`
