import { checkAuth } from '@/lib/check-auth'

import { Shell } from '@/components/shared/Shell'

import { Leaderboard } from '@/components/leaderboard/Leaderboard'

export default async function LeaderboardPage() {
  await checkAuth()

  return (
    <Shell name="Leaderboard">
      <Leaderboard />
    </Shell>
  )
}
