import styled from "styled-components";
import { Button } from "./Button";
import { VisuallyHidden } from "./VisuallyHidden";

interface IconButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick: (e: React.SyntheticEvent) => void;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  text,
  onClick,
}) => {
  return (
    <StyledButton onClick={onClick} title={text}>
      {icon}
      <VisuallyHidden>{text}</VisuallyHidden>
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  opacity: 0.7;
  transition: opacity 1s var(--timing);

  &:hover {
    opacity: 1;
  }
`;
