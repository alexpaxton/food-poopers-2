import { checkAuth } from '@/lib/check-auth'

import { Shell } from '@/components/shared/Shell'

export default async function LeaderboardPage() {
  await checkAuth()

  return (
    <Shell name="Leaderboard">
      <p>Leaderboard</p>
    </Shell>
  )
}
