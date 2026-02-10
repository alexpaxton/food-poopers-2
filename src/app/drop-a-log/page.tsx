'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Shell } from '@/components/shared/Shell';

export default function DropALogPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') return null;

  return (
    <Shell name="Drop a log">
      <p>Drop a Log</p>
    </Shell>
  );
}
