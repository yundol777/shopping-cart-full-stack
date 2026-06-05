import { useLocation } from "react-router";
import Price from "../../commons/Price/Price";

interface CheckoutLocationState {
  itemCount: number;
  totalQuantity: number;
  totalAmount: number;
}

const CheckoutPage = () => {
  const { state } = useLocation();
  const { itemCount, totalQuantity, totalAmount }: CheckoutLocationState =
    state;

  return (
    <div>
      <div>
        <h1>주문 확인</h1>
        <div>
          <p>
            총 {itemCount}종류의 상품 {totalQuantity}개 주문합니다.
          </p>
          <p>최종 결제 금액을 확인해 주세요.</p>
        </div>
        <div>
          <p>총 결제 금액</p>
          <Price value={totalAmount} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
