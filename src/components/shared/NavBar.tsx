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
        <Tab key={href} href={href} active={pathname === href}>
          {label}
        </Tab>
      ))}
    </Nav>
  );
}

const Nav = styled.nav`
  grid-area: NavBar;
  display: grid;
  border-top: 1px solid #e0e0e0;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Tab = styled(Link)<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9375rem;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  color: ${({ active }) => (active ? '#000' : '#666')};
  text-decoration: none;
  background: ${({ active }) => (active ? '#f0f0f0' : 'transparent')};
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: #f0f0f0;
    color: #000;
  }
`;
