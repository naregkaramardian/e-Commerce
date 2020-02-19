import React from "react"
import "./App.css"
import HomePage from "./pages/homepage/hompage.component"
import { Switch, Route, linke } from "react-router-dom"

const HatsPage = () => (
  <div>
    <h1>Hats Page</h1>
  </div>
)

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop/hats" component={HatsPage} />
      </Switch>
    </div>
  )
}

export default App
