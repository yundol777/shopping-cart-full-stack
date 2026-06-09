import styled from "@emotion/styled";

export const Container = styled.div`
  width: 32px;
  height: 32px;
  border: 4px solid #e5e5e5;
  border-top-color: #111111;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
