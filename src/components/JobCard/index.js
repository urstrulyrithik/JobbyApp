import {Link} from 'react-router-dom'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobData} = props
  //   const updatedData = {
  //     companyLogoUrl: jobData.company_logo_url,
  //     employmentType: jobData.employment_type,
  //     id: jobData.id,
  //     jobDescription: jobData.job_description,
  //     location: jobData.location,
  //     packagePerAnnum: jobData.package_per_annum,
  //     rating: jobData.rating,
  //     title: jobData.title,
  //   }
  //   console.log(jobData)
  return (
    <li className="product-item">
      <Link to={`/jobs/${jobData.id}`} className="link-item">
        <div>
          <div>
            <img
              src={jobData.companyLogoUrl}
              alt="company logo"
              className="thumbnail"
            />
            <div>
              <h1 className="title">{jobData.title}</h1>
              <div>
                <img
                  src="https://www.outsystems.com/Forge_CW/_image.aspx/Q8LvY--6WakOw9afDCuuGQQG7h_qkQIv0gieOWVjE_A=/starrating-react-widget"
                  alt="star"
                />
                <p>{jobData.rating}</p>
              </div>
            </div>
            <div>
              <div>
                <IoLocationSharp />
                <p>{jobData.location}</p>
              </div>
              <div>
                <BsFillBriefcaseFill />
                <p>{jobData.employmentType}</p>
              </div>
              <p>{jobData.packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <h1>Description</h1>
          <p>{jobData.jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobCard
