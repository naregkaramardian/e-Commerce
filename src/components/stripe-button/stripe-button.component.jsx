import React from "react"
import StripeCheckout from "react-stripe-checkout"

const StripeCheckoutButoon = ({ price }) => {
  const priceForStripe = price * 100
  const publishableKey = "pk_test_XEgSIBAq0Nh3qjVYJv3AFkV400mIh5E0Mn"

  const onToken = token => {
    console.log(token)
    alert("Payment Successful")
  }

  return (
    <StripeCheckout
      label="Pay Now"
      name="e-commerce"
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}


export default StripeCheckoutButoon