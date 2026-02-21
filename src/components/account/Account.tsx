'use client'

import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useRef, useState } from 'react'
import styled from 'styled-components'

import { Avatar } from '@/components/shared/Avatar'
import { Button } from '@/components/shared/Button'
import { Input } from '@/components/shared/Input'
import { useToasts } from '@/components/shared/ToastProvider'

import { COLORS } from '@/constants'

type Props = {
  alias: string
  name: string
  email: string
}

export function Account({ alias, name, email }: Props) {
  const [workingAlias, setWorkingAlias] = useState(alias)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { notify } = useToasts()

  const checkAlias = useMutation({
    mutationFn: async (value: string) => {
      const res = await fetch(
        `/api/user/alias/check?alias=${encodeURIComponent(value)}`
      )
      return res.json() as Promise<{ available: boolean }>
    },
    onSuccess: (data) => {
      setIsAvailable(data.available)
    },
  })

  const updateAlias = useMutation({
    mutationFn: async (value: string) => {
      const res = await fetch('/api/user/alias', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alias: value }),
      })
      return res.json() as Promise<{ alias: string }>
    },
    onSuccess: (data) => {
      setIsAvailable(null)
      notify({
        type: 'success',
        dismissable: true,
        heading: 'Alias updated!',
        emoji: '👑',
        body: `Let ye be known as "${data.alias}", first of their name, destroyer of thrones`,
      })
    },
  })

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const trimmed = e.target.value.trim().replace(/\s/g, '')
    setWorkingAlias(trimmed)
    setIsAvailable(null)

    if (debounceTimer.current) clearTimeout(debounceTimer.current)

    if (trimmed.length >= 6) {
      debounceTimer.current = setTimeout(() => checkAlias.mutate(trimmed), 500)
    }
  }

  const disabled =
    alias === workingAlias || (alias.length < 6 && isAvailable !== true)

  return (
    <Container>
      <DetailsCard>
        <Avatar size="8rem" variant="default" />
        <NameAndEmail>
          <Name>{name}</Name>
          <Email>{email}</Email>
        </NameAndEmail>
      </DetailsCard>
      <Card>
        <InputLabel>Alias</InputLabel>
        <InputDescription>
          This is how others will see you on the leaderboard page
        </InputDescription>
        <InputContainer>
          <Input
            type="text"
            placeholder="Choose an alias"
            value={workingAlias}
            name="Alias"
            onChange={handleInputChange}
          />
          <Button
            disabled={disabled}
            text="Change"
            variant="secondary"
            onClick={() => updateAlias.mutate(workingAlias)}
          />
        </InputContainer>
        <InputFeedback>
          <Validation>Must be between 6-24 characters</Validation>
          {isAvailable !== null && (
            <Validation>
              {isAvailable ? 'Alias is available!' : 'Alias is taken'}
            </Validation>
          )}
        </InputFeedback>
      </Card>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  gap: 3rem;
`

const Card = styled.div`
  border-radius: 0.75rem;
  border: ${COLORS.border.width} solid ${COLORS.border.primary};
  background-color: ${COLORS.bg.primary};
  padding: 3rem;
`

const DetailsCard = styled(Card)`
  display: flex;
  gap: 3rem;
  align-items: center;
`

const Name = styled.h4`
  font-size: 3rem;
  font-weight: 600;
`

const Email = styled.h5`
  font-size: 1.5rem;
  color: ${COLORS.text.secondary};
`

const NameAndEmail = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
`

const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
`

const InputFeedback = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.5rem;
  padding-top: 1rem;
`
const Validation = styled.div`
  font-size: 1.5rem;
  color: ${COLORS.text.secondary};
`

const InputLabel = styled.div`
  font-size: 3rem;
  font-weight: 600;
`
const InputDescription = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`
