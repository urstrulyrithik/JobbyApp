import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {details} = props
  const data = {
    companyLogoUrl: details.company_logo_url,
    employmentType: details.employment_type,
    jobDescription: details.job_description,
    location: details.location,
    rating: details.rating,
    title: details.title,
  }

  return (
    <li>
      <div>
        <div>
          <img src={data.companyLogoUrl} alt="similar job company logo" />
          <div>
            <h1>{data.title}</h1>
            <div>
              <img
                src="https://www.outsystems.com/Forge_CW/_image.aspx/Q8LvY--6WakOw9afDCuuGQQG7h_qkQIv0gieOWVjE_A=/starrating-react-widget"
                alt="star"
              />
              <p>{data.rating}</p>
            </div>
          </div>
        </div>
        <h1>Description</h1>
        <p>{data.jobDescription}</p>
        <div>
          <div>
            <div>
              <IoLocationSharp />
              <p>{data.location}</p>
            </div>
            <div>
              <BsFillBriefcaseFill />
              <p>{data.employmentType}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItem
