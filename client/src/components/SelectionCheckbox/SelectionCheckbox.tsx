import checkIcon from "../../assets/check.svg";
import { Container } from "./SelectionCheckbox.styles";

interface Props {
  isChecked: boolean;
  onClick: () => void;
}

const SelectionCheckbox = ({ isChecked, onClick }: Props) => {
  return (
    <Container type="button" onClick={onClick} isChecked={isChecked}>
      <img src={checkIcon} alt="" />
    </Container>
  );
};

export default SelectionCheckbox;
