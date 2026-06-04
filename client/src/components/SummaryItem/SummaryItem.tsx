import Price from "../../commons/Price/Price";

interface Props {
  label: string;
  price: number;
}

const SummaryItem = ({ label, price }: Props) => {
  return (
    <div>
      <span>{label}</span>
      <Price value={price} />
    </div>
  );
};

export default SummaryItem;
