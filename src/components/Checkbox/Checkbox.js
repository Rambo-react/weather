import PropTypes from 'prop-types';
import './checkbox.scss';

function Checkbox({
  value,
  text,
  onChangeHandler,
  id,
}) {
  return (
    <label className="custom-checkbox" htmlFor={id}>
      <input type="checkbox" checked={value} value={value} id={id} onChange={onChangeHandler} />
      <span>{text}</span>
    </label>
  );
}

Checkbox.propTypes = {
  value: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Checkbox;
