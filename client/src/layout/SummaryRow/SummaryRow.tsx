import Price from "../../commons/Price/Price";
import Between from "../Between/Between";
import { Text } from "./SummaryRow.styles";

interface Props {
  label: string;
  value: number;
}

const SummaryRow = ({ label, value }: Props) => {
  return (
    <Between>
      <Text>{label}</Text>
      <Price value={value} />
    </Between>
  );
};

export default SummaryRow;
