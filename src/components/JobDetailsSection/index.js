import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiLinkExternal} from 'react-icons/bi'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import SkillItem from '../SkillItem'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetailsSection extends Component {
  state = {
    jobData: {},

    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.job_details.company_logo_url,
    companyWebsiteUrl: data.job_details.company_website_url,
    employmentType: data.job_details.employment_type,
    id: data.job_details.id,
    jobDescription: data.job_details.job_description,
    skills: data.job_details.skills,
    lifeAtCompany: data.job_details.life_at_company,
    similarJobs: data.similar_jobs,
    location: data.job_details.location,
    packagePerAnnum: data.job_details.package_per_annum,
    rating: data.job_details.rating,
  })

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = await this.getFormattedData(fetchedData)
      //   const updatedSimilarProductsData = updatedData.similarJobs.map(
      //     each => this.getFormattedData(eachSimilarProduct),
      //   )
      console.log(updatedData)
      this.setState({
        jobData: updatedData,

        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-view-image"
      />
      <h1 className="product-not-found-heading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="button">
        Retry
      </button>
    </div>
  )

  renderJobDetailsView = () => {
    const {jobData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      similarJobs,
      location,
      packagePerAnnum,
      rating,
      lifeAtCompany,
    } = jobData
    const latUrl = lifeAtCompany.image_url

    return (
      <div>
        <div>
          <div>
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="thumbnail"
            />
            <div>
              <h1 className="title">Devops Engineer</h1>
              <div>
                <img
                  src="https://www.outsystems.com/Forge_CW/_image.aspx/Q8LvY--6WakOw9afDCuuGQQG7h_qkQIv0gieOWVjE_A=/starrating-react-widget"
                  alt="star"
                />
                <p>{rating}</p>
              </div>
            </div>
            <div>
              <div>
                <IoLocationSharp />
                <p>{location}</p>
              </div>
              <div>
                <BsFillBriefcaseFill />
                <p>{employmentType}</p>
              </div>
              <p>{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div>
            <div>
              <h1>Description</h1>
              <a href={companyWebsiteUrl}>
                Visit <BiLinkExternal />
              </a>
            </div>
            <p>{jobDescription}</p>
            <h2>Skills</h2>
            <div>
              <ul>
                {skills.map(each => (
                  <SkillItem key={each.name} skillDetails={each} />
                ))}
              </ul>
            </div>
            <h1>Life at Company</h1>
            <div>
              <p>{lifeAtCompany.description}</p>
              <img src={latUrl} alt="life at company" />
            </div>
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <div>
          <ul>
            {similarJobs.map(each => (
              <SimilarJobItem key={each.id} details={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobDetailsSection
