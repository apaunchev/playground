import styled from "styled-components";

interface ButtonProps {
  title: string;
  onClick: (e: React.SyntheticEvent) => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  title,
  onClick,
  ...rest
}) => {
  return (
    <BaseButton onClick={onClick} title={title} {...rest}>
      {children}
    </BaseButton>
  );
};

const BaseButton = styled.button`
  display: block;
  margin: 0px;
  padding: 0px;
  border: medium none;
  background: transparent none repeat scroll 0% 0%;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
`;
