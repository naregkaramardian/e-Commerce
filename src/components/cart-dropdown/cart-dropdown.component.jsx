import React from "react"
import { withRouter } from "react-router-dom"

import { connect } from "react-redux"
import { selectCartItems } from "../../redux/cart/cart.selectors"
import { toggleCartHidden } from "../../redux/cart/cart.action"
import { createStructuredSelector } from "reselect"

import CustomButton from "../custom-button/custom-button.components"
import CartItem from "../cart-item/cart-item.component"

import "./cart-dropdown.styles.scss"

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown ">
    <div className={`${cartItems.length > 3 ? "scroll" : ""} cart-items`}>
      {cartItems.length ? (
        cartItems.map(cartitem => (
          <CartItem key={cartitem.id} item={cartitem} />
        ))
      ) : (
        <span className="empty-message">Your Cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout")
        dispatch(toggleCartHidden())
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
)

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown))
