import './index.css'

const SkillItem = props => {
  const {skillDetails} = props
  const data = {imageUrl: skillDetails.image_url, name: skillDetails.name}

  return (
    <li>
      <div>
        <img src={data.imageUrl} alt={data.name} />
        <p>{data.name}</p>
      </div>
    </li>
  )
}
export default SkillItem
