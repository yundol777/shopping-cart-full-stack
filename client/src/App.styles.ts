import styled from "@emotion/styled";

export const StyledMain = styled.main`
  position: relative;
  width: 100%;
  height: 800px;
  max-width: 430px;
  margin: 0 auto;
  overflow: hidden;
  background: white;
`;

export const ScrollArea = styled.div`
  height: calc(100% - 56px - 52px);
  overflow-y: auto;
`;
