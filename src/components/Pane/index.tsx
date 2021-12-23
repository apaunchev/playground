import { ReactNode } from "react";
import styled from "styled-components";

interface PaneProps {
  title: string;
  actions: ReactNode;
}

export const Pane: React.FC<PaneProps> = ({ children, title, actions }) => {
  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        <ActionBar>{actions}</ActionBar>
      </Header>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 16px 16px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
`;

const Title = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-text);
  text-transform: uppercase;
  cursor: default;
`;

const ActionBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
