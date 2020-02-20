import React from "react"
import "./App.css"
import HomePage from "./pages/homepage/hompage.component"
import ShopPage from "./pages/shop/shop.component.jsx"
import { Switch, Route} from "react-router-dom"



function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
      </Switch>
    </div>
  )
}

export default App
