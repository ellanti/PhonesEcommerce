import styled from 'styled-components'

const CartIcon = styled.i`
  color: #fab720;
  font-size: 1.8em;
`

function Cart() {
  return (
    <div>
      <CartIcon className="material-icons">shopping_cart</CartIcon>
    </div>
  )
}

export default Cart
