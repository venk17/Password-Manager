import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from './PasswordItem'
import './App.css'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    count: 0,
    showPassword: false,
    passwordList: [],
    searchInput: '',
  }

  handleInputChange = (field, value) => {
    this.setState({[field]: value})
  }

  handleAddPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    if (website && username && password) {
      const newPassword = {
        id: uuidv4(),
        website,
        username,
        password,
      }

      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, newPassword],
        count: prevState.passwordList.length + 1,
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  handleDeletePassword = id => {
    this.setState(prevState => ({
      passwordList: prevState.passwordList.filter(item => item.id !== id),
      count: prevState.count - 1,
    }))
  }

  handleSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  togglePasswordVisibility = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  getFilteredPasswords = () => {
    const {passwordList, searchInput} = this.state
    return passwordList.filter(item =>
      item.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  render() {
    const {website, username, password, showPassword, count} = this.state
    const filteredPasswords = this.getFilteredPasswords()
    const isEmpty = filteredPasswords.length === 0

    return (
      <div className="app-container">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo"
          />
        </div>

        <div className="password-manager">
          <div className="add-password-section">
            <form className="password-form" onSubmit={this.handleAddPassword}>
              <h1 className="form-title">Add New Password</h1>

              <div className="input-group">
                <div className="input-icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-icon"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="form-input"
                  value={website}
                  onChange={e =>
                    this.handleInputChange('website', e.target.value)
                  }
                />
              </div>

              <div className="input-group">
                <div className="input-icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-icon"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="form-input"
                  value={username}
                  onChange={e =>
                    this.handleInputChange('username', e.target.value)
                  }
                />
              </div>

              <div className="input-group">
                <div className="input-icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-icon"
                  />
                </div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="form-input"
                  value={password}
                  onChange={e =>
                    this.handleInputChange('password', e.target.value)
                  }
                />
              </div>

              <button type="submit" className="add-button">
                Add
              </button>
            </form>

            <div className="password-manager-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-manager-image"
              />
            </div>
          </div>

          <div className="password-list-section">
            <div className="password-list-header">
              <div className="password-count-container">
                <h2 className="section-title">Your Passwords</h2>
                <span className="password-count">{count}</span>
              </div>

              <div className="search-container">
                <div className="search-icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-icon"
                  />
                </div>
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.handleSearch}
                />
              </div>
            </div>

            <hr className="divider" />

            <div className="show-password-toggle">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={this.togglePasswordVisibility}
              />
              <label htmlFor="showPassword">Show Passwords</label>
            </div>

            {isEmpty ? (
              <div className="empty-state">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="empty-image"
                />
                <p className="empty-message">No Passwords</p>
              </div>
            ) : (
              <ul className="password-list">
                {filteredPasswords.map(passwordItem => (
                  <PasswordItem
                    key={passwordItem.id}
                    passwordDetails={passwordItem}
                    showPassword={showPassword}
                    onDelete={this.handleDeletePassword}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
