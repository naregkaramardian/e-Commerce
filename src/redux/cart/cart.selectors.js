import {
    createSelector
} from 'reselect'
import CartItem from '../../components/cart-item/cart-item.component';

// input selector
const selectCart = state => state.cart;

// output selector
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems

)

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden

)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
    cartItems.reduce(
        (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity,
        0
    )

)