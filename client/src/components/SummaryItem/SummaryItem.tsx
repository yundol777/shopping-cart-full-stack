import Price from "../../commons/Price/Price";
import { Container, Label, Value } from "./SummaryItem.styles";

interface Props {
  label: string;
  price: number;
}

const SummaryItem = ({ label, price }: Props) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Value>
        <Price value={price} />
      </Value>
    </Container>
  );
};

export default SummaryItem;
