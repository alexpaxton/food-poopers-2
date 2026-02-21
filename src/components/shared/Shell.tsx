"use client";

import { ListIcon } from "@phosphor-icons/react";
import styled from "styled-components";

import { useFlyout } from "@/components/shared/FlyoutProvider";
import { NavBar } from "@/components/shared/NavBar";
import { Toast } from "@/components/shared/Toast";

import { COLORS } from "@/constants";

type Props = {
  name: string;
  children: React.ReactNode;
};

export function Shell({ children, name }: Props) {
  const { showFlyout } = useFlyout();

  return (
    <>
      <Page>
        <PageHeader>
          <PageTitle>{name}</PageTitle>
          <FlyoutButton onClick={showFlyout}>
            <ListIcon color={COLORS.text.primary} size={32} />
          </FlyoutButton>
        </PageHeader>
        <PageBody>{children}</PageBody>
        <NavBar />
      </Page>
      <Toast />
    </>
  );
}

const Page = styled.div`
  display: grid;
  width: 100dvw;
  height: 100dvh;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  grid-template-rows: 9rem auto 9rem;
  grid-template-areas:
    "PageHeader"
    "PageBody"
    "NavBar";
`;

const PageHeader = styled.header`
  grid-area: PageHeader;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border-bottom: ${COLORS.border.width} solid ${COLORS.border.primary}; */
  padding-left: 3rem;
`;

const PageTitle = styled.h1`
  color: ${COLORS.text.primary};
  font-size: 3rem;
  letter-spacing: -0.01em;
`;

const PageBody = styled.div`
  grid-area: PageBody;
  background: linear-gradient(
    180deg,
    ${COLORS.bg.primary} 0%,
    ${COLORS.bg.secondary} 100%
  );
  overflow-y: auto;
  overflow-x: hidden;
`;

const FlyoutButton = styled.button`
  width: 9rem;
  height: 9rem;
  border: none;
  background-color: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
