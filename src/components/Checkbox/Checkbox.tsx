import './checkbox.scss';

type CheckboxType = {
  val: boolean,
  text: string,
  onChangeHandler: () => void,
  id: string,
}

function Checkbox({
  val,
  text,
  onChangeHandler,
  id,
}: CheckboxType) {
  return (
    <label className="custom-checkbox" htmlFor={id}>
      <input type="checkbox" checked={val} value={val.toString()} id={id} onChange={onChangeHandler} />
      <span>{text}</span>
    </label>
  );
}

export default Checkbox;
