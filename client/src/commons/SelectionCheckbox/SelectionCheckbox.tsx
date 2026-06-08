import checkIcon from "../../assets/check.svg";
import { Container } from "./SelectionCheckbox.styles";

interface Props {
  id: string;
  isChecked: boolean;
  ariaLabel: string;
  onClick: () => void;
}

const SelectionCheckbox = ({ id, isChecked, ariaLabel, onClick }: Props) => {
  return (
    <Container
      id={id}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      isChecked={isChecked}
    >
      <img src={checkIcon} alt="" />
    </Container>
  );
};

export default SelectionCheckbox;
