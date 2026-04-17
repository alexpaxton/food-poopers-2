'use client'

import { ChangeEventHandler } from 'react'
import styled from 'styled-components'

import {
  fieldContainerStyles,
  fieldElementStyles,
  FieldGlow,
} from '@/components/shared/fieldStyles'

type TextAreaProps = {
  name: string
  value: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  placeholder?: string
  disabled?: boolean
}

export function TextArea({
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
}: TextAreaProps) {
  return (
    <TextAreaContainer>
      <TextAreaElement
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        maxLength={2400}
        disabled={disabled}
      />
      <FieldGlow />
    </TextAreaContainer>
  )
}

const TextAreaElement = styled.textarea`
  ${fieldElementStyles}
  font-family:
    Nunito,
    Nunito Fallback;
  min-width: 100%;
  max-width: 100%;
  height: 11rem;
  min-height: 11rem;
  max-height: 11rem;
  padding: 1.5rem;
`

const TextAreaContainer = styled.div`
  ${fieldContainerStyles}
  height: 11rem;
`
