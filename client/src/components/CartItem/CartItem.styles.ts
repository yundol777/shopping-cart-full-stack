import styled from "@emotion/styled";

export const Container = styled.article`
  padding: 20px 0 28px;
  border-bottom: 1px solid #e5e5e5;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const DeleteButton = styled.button`
  min-width: 40px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: #ffffff;
  color: #000000;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

export const ItemBody = styled.div`
  display: grid;
  grid-template-columns: 112px 1fr;
  gap: 24px;
  align-items: center;
`;

export const ItemImage = styled.img`
  width: 112px;
  height: 112px;
  border-radius: 8px;
  object-fit: cover;
`;

export const ItemInfo = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 28px;
`;

export const ItemName = styled.p`
  margin: 0 0 6px;
  overflow: hidden;
  font-size: 17px;
  font-weight: 800;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ItemPrice = styled.div`
  display: flex;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 18px;
  font-weight: 600;
`;

export const ControlButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: #ffffff;
  color: #333333;
  font-size: 28px;
  font-weight: 300;
  line-height: 1;
  cursor: pointer;
`;
