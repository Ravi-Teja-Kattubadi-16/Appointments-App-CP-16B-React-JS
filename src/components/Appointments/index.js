// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    starredFilterStatus: 'inactive-starred-button',
    allAppointments: '',
  }

  onClickInputTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onClickAddButton = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state

    const newAppointmentObject = {
      id: uuidv4(),
      titleInput,
      dateInput,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointmentObject],
      titleInput: '',
      dateInput: '',
    }))
  }

  markStarButton = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  toggleStarFilter = () => {
    const {starredFilterStatus} = this.state
    if (starredFilterStatus === 'inactive-starred-button') {
      this.setState(prevState => ({
        starredFilterStatus: 'active-starred-button',
        allAppointments: prevState.appointmentsList,
        appointmentsList: prevState.appointmentsList.filter(
          eachAppointment => eachAppointment.isStarred === true,
        ),
      }))
    } else {
      this.setState(prevState => ({
        starredFilterStatus: 'inactive-starred-button',
        appointmentsList: prevState.allAppointments,
      }))
    }
  }

  render() {
    const {
      appointmentsList,
      starredFilterStatus,
      titleInput,
      dateInput,
    } = this.state

    return (
      <div className="app-container">
        <div className="appointments-container">
          <div className="main-bg-container">
            <div className="appointment-container-one">
              <h1 className="main-heading"> Add Appointment </h1>
              <form className="form-container">
                <label htmlFor="titleId" className="title">
                  TITLE
                </label>
                <input
                  type="text"
                  id="titleId"
                  placeholder="Title"
                  className="input-title"
                  onChange={this.onClickInputTitle}
                  value={titleInput}
                />
                <label htmlFor="dateId" className="date">
                  Date
                </label>
                <input
                  type="date"
                  className="input-date"
                  onChange={this.onChangeDateInput}
                  value={dateInput}
                />
                <button
                  type="submit"
                  className="add-button"
                  onClick={this.onClickAddButton}
                >
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
          </div>
          <hr className="horizontal-line" />

          <div className="appointments">
            <h1 className="sub-heading"> Appointments </h1>
            <button
              type="button"
              className={starredFilterStatus}
              onClick={this.toggleStarFilter}
            >
              Starred
            </button>
          </div>
          <ul className="unordered-list-container">
            {appointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                eachAppointment={eachAppointment}
                markStarButton={this.markStarButton}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
