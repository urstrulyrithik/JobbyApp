import './index.css'

const RadioItem = props => {
  const {option, changeSalaryRange} = props
  const {label, salaryRangeId} = option

  const onClick = () => {
    changeSalaryRange(salaryRangeId)
  }
  return (
    <li>
      <label>
        <input type="radio" onChange={onClick} value={label} />
        {label}
      </label>
    </li>
  )
}
export default RadioItem
