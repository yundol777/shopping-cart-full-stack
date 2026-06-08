import type { ComponentPropsWithoutRef } from "react";
import checkIcon from "../../assets/check.svg";
import { Container } from "./SelectionCheckbox.styles";

interface Props extends ComponentPropsWithoutRef<"button"> {
  isChecked: boolean;
}

const SelectionCheckbox = ({ isChecked, ...buttonProps }: Props) => {
  return (
    <Container type="button" isChecked={isChecked} {...buttonProps}>
      <img src={checkIcon} alt="" />
    </Container>
  );
};

export default SelectionCheckbox;
