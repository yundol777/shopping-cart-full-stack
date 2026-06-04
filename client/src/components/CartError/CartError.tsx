interface Props {
  error: string;
}

const CartError = ({ error }: Props) => {
  return <div>{error}</div>;
};

export default CartError;
