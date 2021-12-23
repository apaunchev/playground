import styled from "styled-components";

interface PaneProps {
  title: string;
}

export const Pane: React.FC<PaneProps> = ({ children, title }) => {
  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        <ActionBar></ActionBar>
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
`;

const Title = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  line-height: 48px;
  color: var(--color-text-primary);
  text-transform: uppercase;
  cursor: default;
`;

const ActionBar = styled.div`
  display: flex;
  gap: 8px;
`;
