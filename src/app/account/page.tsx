import { checkAuth } from '@/lib/check-auth'

import { Shell } from '@/components/shared/Shell'

import { Account } from '@/components/account/Account'

export default async function AccountPage() {
  const user = await checkAuth()

  return (
    <Shell name="Account" layout="settings">
      <Account
        alias={user.alias ?? ''}
        name={user.name ?? ''}
        email={user.email}
      />
    </Shell>
  )
}
