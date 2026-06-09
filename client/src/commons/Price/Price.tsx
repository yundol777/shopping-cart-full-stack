import { Container } from "./Price.styles";

const Price = ({ value }: { value: number }) => {
  return <Container>{value.toLocaleString()}원</Container>;
};

export default Price;
