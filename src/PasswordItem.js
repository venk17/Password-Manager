import React from 'react'
import './index.css'

const PasswordItem = props => {
  const {listDetails, showPassword, deleteDetails} = props
  const {id, website, username, password} = listDetails

  const onDelete = () => {
    deleteDetails(id)
  }

  return (
    <li className="list">
      <p className="icon">{username[0].toUpperCase()}</p>
      <div className="details">
        <p>{website}</p>
        <p>{username}</p>
        {showPassword ? (
          <p>{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
          />
        )}
      </div>
      <button
        className="delete"
        type="button"
        onClick={onDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="logo"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
