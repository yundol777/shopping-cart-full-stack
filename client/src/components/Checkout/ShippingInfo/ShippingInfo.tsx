import { useState } from "react";
import SelectionCheckbox from "../../../commons/SelectionCheckbox/SelectionCheckbox";
import {
  getIsRemoteArea,
  setIsRemoteArea as saveIsRemoteArea,
} from "../../../storage/order.storage";
import { Container, Title, RowContent, Label } from "./ShippingInfo.styles";

interface Props {
  refetch: () => void;
}

const ShippingInfo = ({ refetch }: Props) => {
  const [isRemoteArea, setIsRemoteArea] = useState(() => getIsRemoteArea());

  const handleToggleChecked = () => {
    setIsRemoteArea((prev) => {
      const nextValue = !prev;
      saveIsRemoteArea(nextValue);
      refetch();
      return nextValue;
    });
  };

  return (
    <Container>
      <Title>배송 정보</Title>
      <RowContent>
        <SelectionCheckbox
          isChecked={isRemoteArea}
          onClick={handleToggleChecked}
        />
        <Label>제주도 및 도서 산간 지역</Label>
      </RowContent>
    </Container>
  );
};

export default ShippingInfo;
