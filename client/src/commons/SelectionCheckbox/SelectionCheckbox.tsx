import checkIcon from "../../assets/check.svg";
import { Container } from "./SelectionCheckbox.styles";

interface Props {
  id: string;
  isChecked: boolean;
  onClick: () => void;
}

const SelectionCheckbox = ({ id, isChecked, onClick }: Props) => {
  return (
    <Container id={id} type="button" onClick={onClick} isChecked={isChecked}>
      <img src={checkIcon} alt="" />
    </Container>
  );
};

export default SelectionCheckbox;
