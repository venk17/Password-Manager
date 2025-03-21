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
    newList: [],
    searchInput: '',
  }

  onShowPassword = () => {
    const {showPassword} = this.state
    this.setState({showPassword: !showPassword})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    const newDetails = {
      id: uuidv4(),
      website,
      username,
      password,
    }

    this.setState(prevState => ({
      newList: [...prevState.newList, newDetails],
      count: prevState.count + 1,
      website: '',
      username: '',
      password: '',
    }))
  }

  onWebsite = event => {
    this.setState({website: event.target.value})
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  searchItems = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteDetails = id => {
    const {newList} = this.state
    const filteredList = newList.filter(eachItem => eachItem.id !== id)
    this.setState(prevState => ({
      count: prevState.count - 1,
      newList: filteredList,
    }))
  }

  render() {
    const {
      website,
      username,
      password,
      count,
      newList,
      showPassword,
      searchInput,
    } = this.state

    const filteredPasswordList = newList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const isNoPassword = filteredPasswordList.length === 0

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />
        <div className="top-container">
          <form className="input-card-container" onSubmit={this.onAddPassword}>
            <h1 className="input-heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="logo"
                alt="website"
              />
              <input
                className="input"
                placeholder="Enter Website"
                type="text"
                value={website}
                onChange={this.onWebsite}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="logo"
                alt="username"
              />
              <input
                className="input"
                placeholder="Enter username"
                type="text"
                value={username}
                onChange={this.onUsername}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="logo"
                alt="password"
              />
              <input
                className="input"
                placeholder="Enter Password"
                type="password"
                value={password}
                onChange={this.onPassword}
              />
            </div>
            <button className="add-btn" type="submit">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="app-image"
            alt="password manager"
          />
        </div>
        <div className="bottom-container">
          <div className="bottom-heading-search">
            <div className="bottom-heading-container">
              <h1 className="input-heading">Your Passwords</h1>
              <p className="count">{count}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="logo"
                alt="search"
              />
              <input
                className="search"
                type="search"
                value={searchInput}
                onChange={this.searchItems}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox"
              onClick={this.onShowPassword}
              id="check"
            />
            <label className="para" htmlFor="check">
              Show Passwords
            </label>
          </div>
          {isNoPassword ? (
            <div className="nopass">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="no-pw"
                alt="no passwords"
              />
              <p className="input-heading">No Passwords</p>
            </div>
          ) : (
            <ul className="list-container">
              {filteredPasswordList.map(eachItem => (
                <PasswordItem
                  listDetails={eachItem}
                  key={eachItem.id}
                  showPassword={showPassword}
                  deleteDetails={this.deleteDetails}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
