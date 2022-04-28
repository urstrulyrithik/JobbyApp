import './index.css'

const Checkbox = props => {
  const {option, onToggleCheckbox} = props
  const {label, employmentTypeId} = option

  let isChecked = false

  const onClick = () => {
    isChecked = !isChecked
  }

  const onToggle = () => {
    onToggleCheckbox(employmentTypeId)
  }
  return (
    <li>
      <label>
        <input
          type="checkbox"
          onChange={(onToggle, onClick)}
          checked={isChecked}
          value={label}
        />
        {label}
      </label>
    </li>
  )
}
export default Checkbox
