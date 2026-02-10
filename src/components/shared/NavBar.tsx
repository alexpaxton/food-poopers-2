'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

const TABS = [
  { label: 'Home', href: '/' },
  { label: 'Log', href: '/drop-a-log' },
  { label: 'Leaderboard', href: '/leaderboard' },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <Nav>
      {TABS.map(({ label, href }) => (
        <Tab key={href} href={href} $active={pathname === href}>
          {label}
        </Tab>
      ))}
    </Nav>
  );
}

const Nav = styled.nav`
  grid-area: NavBar;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

const Tab = styled(Link)<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  font-size: 0.9375rem;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  color: ${({ $active }) => ($active ? '#000' : '#666')};
  text-decoration: none;
  border-radius: 6px;
  background: ${({ $active }) => ($active ? '#f0f0f0' : 'transparent')};
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: #f0f0f0;
    color: #000;
  }
`;
