import { Container } from "./Button.styles";

interface Props {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled = false }: Props) => {
  return (
    <Container type="button" onClick={onClick} disabled={disabled}>
      {label}
    </Container>
  );
};

export default Button;
