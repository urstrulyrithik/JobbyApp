import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import RadioItem from '../RadioItem'
import JobCard from '../JobCard'
import ProfileBox from '../ProfileBox'

import './index.css'
import Checkbox from '../Checkbox'

console.log('entered')

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    activeSalaryRange: '',
    searchInput: '',
    activeEmploymentType: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    console.log('trigerred')
    const {activeSalaryRange, activeEmploymentType, searchInput} = this.state
    const apiUrl = ` https://apis.ccbp.in/jobs?employment_type=${activeEmploymentType.join()}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onToggleCheckbox = id => {
    const {activeEmploymentType} = this.state
    if (activeEmploymentType.includes(id)) {
      const updatedActiveList = activeEmploymentType.filter(each => each !== id)
      this.setState({activeEmploymentType: updatedActiveList}, this.getJobs)
    } else {
      const updatedActiveList = activeEmploymentType.push(id)
      this.setState({activeEmploymentType: updatedActiveList}, this.getJobs)
    }
  }

  changeSalaryRange = activeSalaryRange => {
    this.setState({activeSalaryRange}, this.getJobs)
  }

  onChangeSearchInput = searchInput => {
    this.setState({searchInput}, this.getJobs)
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  renderFailureView = () => (
    <div>
      <div className="products-error-view-container">
        <img
          src="https://assets.ccbp.in/frontend/content/react-js/jobby-app-jobs-failure-lg-output-v0.png"
          alt="jobs failure"
          className="products-failure-img"
        />
        <h1 className="product-failure-heading-text">
          Oops! Something Went Wrong
        </h1>
        <p className="products-failure-description">
          We cannot seem to find the page you are looking for.
        </p>
        <button type="button" className="retryBtn" onClick={this.getJobs()}>
          Retry
        </button>
      </div>
    </div>
  )

  renderJobsListView = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <div>
        <div className="all-products-container">
          <ul className="products-list">
            {jobsList.map(job => (
              <JobCard jobData={job} key={job.id} />
            ))}
          </ul>
        </div>
      </div>
    ) : (
      <div>
        <div className="no-products-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            className="no-products-img"
            alt="no jobs"
          />
          <h1 className="no-products-heading">No Jobs Found</h1>
          <p className="no-products-description">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div>
        <Header />
        <div className="all-products-section">
          <div>
            <div>
              <ProfileBox />
            </div>
            <hr />
            <div>
              <h1>Type Of Employment</h1>
              <div className="checkboxCont">
                <ul>
                  {employmentTypesList.map(eachOption => (
                    <Checkbox
                      key={eachOption.employmentTypeId}
                      option={eachOption}
                      onToggleCheckbox={this.onToggleCheckbox}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <hr />
            <div>
              <h1>Salary Range</h1>
              <div>
                <ul>
                  {salaryRangesList.map(each => (
                    <RadioItem
                      key={each.salaryRangeId}
                      option={each}
                      changeSalaryRange={this.changeSalaryRange}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className="search-input-container">
              <input
                value={searchInput}
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button type="button" testid="searchButton">
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderAllJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default AllJobsSection
