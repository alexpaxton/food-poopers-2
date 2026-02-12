"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { signOut } from "next-auth/react";
import styled from "styled-components";
import { XIcon, SignOutIcon } from "@phosphor-icons/react";
import { Avatar } from "@/components/shared/Avatar";

type FlyoutContextType = {
  isVisible: boolean;
  toggleFlyout: () => void;
  showFlyout: () => void;
  hideFlyout: () => void;
};

const FlyoutContext = createContext<FlyoutContextType | undefined>(undefined);

type FlyoutProviderProps = {
  children: ReactNode;
};
export function FlyoutProvider({ children }: FlyoutProviderProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  function toggleFlyout() {
    setIsVisible((v) => !v);
  }

  function showFlyout() {
    setIsVisible(true);
  }

  function hideFlyout() {
    setIsVisible(false);
  }

  return (
    <FlyoutContext.Provider
      value={{ isVisible, toggleFlyout, showFlyout, hideFlyout }}
    >
      <Flyout $visible={isVisible}>
        <FlyoutMaskEscape onClick={hideFlyout} />
        <FlyoutMenu>
          <CloseButton onClick={hideFlyout}>
            <XIcon color="#fff" size={32} />
          </CloseButton>
          <MenuItem onClick={() => signOut()}>
            <SignOutIcon color="#fff" size={32} />
            Sign out
          </MenuItem>
          <MenuItem>
            <Avatar />
            Account
          </MenuItem>
        </FlyoutMenu>
      </Flyout>
      <FlyoutMask $visible={isVisible} />
      {children}
    </FlyoutContext.Provider>
  );
}

export function useFlyout(): FlyoutContextType {
  const context = useContext(FlyoutContext);

  if (context === undefined) {
    throw new Error(
      "useFlyout must be called from a child element of FlyoutProvider",
    );
  }

  return context;
}

const Flyout = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  z-index: 999;
  transform: ${({ $visible }) =>
    $visible ? "translate3d(0, 0, 0 )" : "translate3d(100%, 0, 0 )"};
  transition: transform 0.3s cubic-bezier(0.87, 0, 0.13, 1);
  display: flex;
  align-items: stretch;
`;

const FlyoutMask = styled.div<{ $visible: boolean }>`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100dvw;
  height: 100dvh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 888;
  pointer-events: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translate3d(0, 0, 0);
  transition: opacity 0.3s cubic-bezier(0.87, 0, 0.13, 1);
`;

const FlyoutMenu = styled.div`
  width: 77dvw;
  height: 100%;
  background-color: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const FlyoutMaskEscape = styled.div`
  flex: 1 0 0;
`;

const CloseButton = styled.button`
  width: 9rem;
  height: 9rem;
  border: none;
  background-color: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuItem = styled.button`
  height: 9rem;
  width: 100%;
  display: flex;
  align-items: center;
  border: 0;
  background-color: transparent;
  font-size: 3rem;
  letter-spacing: -0.01em;
  color: #fff;
  padding: 0 3rem;
  gap: 3rem;
`;
