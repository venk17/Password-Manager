import './index.css'

const PasswordItem = ({passwordDetails, showPassword, onDelete}) => {
  const {id, website, username, password} = passwordDetails

  const getInitialBackgroundColor = () => {
    const colors = [
      '#7683cb',
      '#f59e0b',
      '#10b981',
      '#f97316',
      '#14b8a6',
      '#b91c1c',
      '#0ea5e9',
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <li className="password-item">
      <div className="password-item-content">
        <div
          className="password-profile"
          style={{backgroundColor: getInitialBackgroundColor()}}
        >
          {username[0].toUpperCase()}
        </div>
        <div className="password-details">
          <p className="password-website">{website}</p>
          <p className="password-username">{username}</p>
          {showPassword ? (
            <p className="password-text">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="password-stars"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(id)}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
