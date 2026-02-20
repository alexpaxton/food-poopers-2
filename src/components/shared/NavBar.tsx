"use client";

import {
  ArrowFatLineDownIcon,
  HouseIcon,
  TrophyIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

import { COLORS } from "@/constants";

const TABS = [
  { label: "Me", href: "/me", Icon: HouseIcon },
  { label: "Log", href: "/drop-a-log", Icon: ArrowFatLineDownIcon },
  { label: "Leaderboard", href: "/leaderboard", Icon: TrophyIcon },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <Nav>
      {TABS.map(({ href, Icon }) => (
        <Tab key={href} href={href} $active={pathname === href}>
          <Icon weight="regular" color="#000" size={32} />
        </Tab>
      ))}
    </Nav>
  );
}

const Nav = styled.nav`
  grid-area: NavBar;
  display: grid;
  border-top: ${COLORS.border.width} solid ${COLORS.border.primary};
  grid-template-columns: 1fr 1fr 1fr;
`;

const Tab = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9375rem;
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  color: ${({ $active }) =>
    $active ? COLORS.text.primary : COLORS.text.secondary};
  text-decoration: none;
  background-color: ${({ $active }) =>
    $active ? COLORS.bg.secondary : "transparent"};
  transition:
    background-color 0.25s,
    color 0.25s;

  &:hover {
    background: ${COLORS.bg.secondary};
    color: ${COLORS.text.primary};
  }
`;
