import Price from "../../commons/Price/Price";
import Column from "../Column/Column";
import Row from "../Row/Row";

interface Props {
  image: string;
  name: string;
  price: number;
  quantityContent: React.ReactNode;
}

const ProductItemLayout = ({ image, name, price, quantityContent }: Props) => {
  return (
    <Row gap={24}>
      <img src={image} />
      <Column gap={24}>
        <Column gap={4}>
          <p>{name}</p>
          <Price value={price} />
        </Column>
        {quantityContent}
      </Column>
    </Row>
  );
};

export default ProductItemLayout;
