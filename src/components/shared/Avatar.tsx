'use client'

import { useSession } from 'next-auth/react'
import styled from 'styled-components'

import { COLORS } from '@/constants'

type Props = {
  size?: string
  variant?: 'invert' | 'default'
}

export function Avatar({ size = '4rem', variant = 'invert' }: Props) {
  const { data, status } = useSession()

  if (status === 'loading' || data === null) {
    return <EmptyCircle $size={size} />
  }

  if (data.user === undefined) {
    return <EmptyCircle $size={size} />
  }

  if (data.user.image === undefined || data.user.image === null) {
    return <EmptyCircle $size={size} />
  }

  return <ImageCircle $variant={variant} $size={size} src={data.user.image} />
}

const BaseCircle = styled.img<{ $size: string }>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
`

const ImageCircle = styled(BaseCircle)<{ $variant: 'invert' | 'default' }>`
  border: 2px solid
    ${({ $variant }) =>
      $variant === 'invert' ? COLORS.bg.primary : COLORS.border.primary};
`

const EmptyCircle = styled(BaseCircle)`
  background-color: ${COLORS.text.primary};
`
