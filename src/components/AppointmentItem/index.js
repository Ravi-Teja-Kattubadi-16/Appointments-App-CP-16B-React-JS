// Write your code here
import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, markStarButton} = props
  const {id, titleInput, dateInput, isStarred} = eachAppointment

  const onClickStarredButton = () => {
    markStarButton(id)
  }

  const starMarkUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const year = dateInput.slice(0, 4)
  const month = dateInput.slice(5, 7) - 1
  const day = dateInput.slice(8, 10)

  return (
    <li className="list-item-container">
      <div className="star-container">
        <h1 className="list-item-heading"> {titleInput} </h1>
        <button
          type="button"
          className="star-button"
          onClick={onClickStarredButton}
          data-testid="star"
        >
          <img
            src={starMarkUrl}
            alt="star"
            // className="star-image"
          />
        </button>
      </div>

      <p className="list-item-description">
        Date: {format(new Date(year, month, day), 'dd MMMM yyyy, EEEE')}
      </p>
    </li>
  )
}

export default AppointmentItem
