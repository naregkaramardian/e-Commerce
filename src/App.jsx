import React from "react"
import "./App.css"
import HomePage from "./pages/homepage/hompage.component"
import ShopPage from "./pages/shop/shop.component.jsx"
import { Switch, Route } from "react-router-dom"
import Header from "./components/header/header.component.jsx"
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sig-in-and-sign-up.component"

import { auth, CreateUserProfileDocument } from "./firebase/firebase.utils"

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await CreateUserProfileDocument(userAuth)

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
          console.log(this.state);
          
        })
      } else {
        this.setState({ currentUser: userAuth })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    )
  }
}

export default App
