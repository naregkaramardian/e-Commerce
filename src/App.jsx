import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"

import { auth, CreateUserProfileDocument } from "./firebase/firebase.utils"
import { setCurentUser } from "./redux/user/user.actions"
import { selectCurrentUser } from "./redux/user/user.selector"
import { createStructuredSelector } from "reselect"

import "./App.css"

import HomePage from "./pages/homepage/hompage.component"
import ShopPage from "./pages/shop/shop.component.jsx"
import CheckoutPage from "./pages/checkout/checkout.component"
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sig-in-and-sign-up.component"

import Header from "./components/header/header.component.jsx"

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await CreateUserProfileDocument(userAuth)

        userRef.onSnapshot(snapshot => {
          setCurentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      } else {
        setCurentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurentUser: user => dispatch(setCurentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
