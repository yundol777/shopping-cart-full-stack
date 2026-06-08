import { Container } from "./Toast.styles";

interface Props {
  message: string;
}

const Toast = ({ message }: Props) => {
  return <Container>⚠️ {message}</Container>;
};

export default Toast;
