'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from 'unique-names-generator'

import { Button } from '@/components/shared/Button'
import { Input } from '@/components/shared/Input'

import { COLORS } from '@/constants'

export function Onboarding() {
  const router = useRouter()
  const [alias, setAlias] = useState<string>('')
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    onSuccess: () => {
      router.push('/me')
    },
  })

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const trimmed = e.target.value.trim().replace(/\s/g, '')
    setAlias(trimmed)
    setIsAvailable(null)

    if (debounceTimer.current) clearTimeout(debounceTimer.current)

    if (trimmed.length >= 6) {
      debounceTimer.current = setTimeout(() => checkAlias.mutate(trimmed), 500)
    }
  }

  function randomize() {
    const randomAlias = uniqueNamesGenerator({
      length: 2,
      dictionaries: [adjectives, animals],
      separator: '',
      style: 'capital',
    })
    setAlias(randomAlias)
  }

  function handleSubmit() {
    updateAlias.mutate(alias)
  }

  const disabled = alias.length < 6 && isAvailable !== true

  return (
    <Page>
      <Heading>Howdy!</Heading>
      <SubHeading>
        Welcome to Food Poopers, the app for tracking your movements.
      </SubHeading>
      <SubHeading>{`Before you start tracking you'll need to pick an alias. This is how others will see you on the leaderboard.`}</SubHeading>
      <InputWrapper>
        <Input
          type="text"
          name="alias"
          value={alias}
          maxLength={24}
          onChange={handleInputChange}
          placeholder="ex: BigShitter1989"
        />
        <Validation>Must be between 6-24 characters</Validation>
        {isAvailable !== null && (
          <Validation>
            {isAvailable ? 'Alias is available!' : 'Alias is taken'}
          </Validation>
        )}
      </InputWrapper>
      <ButtonGroup>
        <Button variant="secondary" onClick={randomize} text="Randomize" />
        <Button
          variant="primary"
          disabled={disabled}
          text="Continue"
          onClick={handleSubmit}
        />
      </ButtonGroup>
    </Page>
  )
}

const Page = styled.div`
  width: 100dvw;
  height: 100dvh;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`

const Heading = styled.h1`
  font-size: 4rem;
  font-weight: 600;
  letter-spacing: -0.01em;
`

const SubHeading = styled.h3`
  font-size: 2rem;
  font-weight: 400;
`

const InputWrapper = styled.div`
  width: 100%;
  max-width: 30rem;
  display: flex;
  flex-direction: column;
  padding: 3rem 0;
  gap: 1rem;
`

const Validation = styled.div`
  font-size: 1.5rem;
  color: ${COLORS.text.secondary};
  padding-left: 1.5rem;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`
