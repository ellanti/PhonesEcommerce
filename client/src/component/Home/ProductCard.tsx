import Link from '@mui/material/Link'
import Rating from '@mui/material/Rating'
import { styled } from '@mui/material/styles'

const PhoneDetails = styled('div')({
  width: '23vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  color: 'black',
  paddingTop: '10px',
  marginTop: '8vh',
  marginBottom: '8vh',
  boxShadow: '0 0 5px rgba(15, 15, 15, 0.26)',
  '&:hover': {
    boxShadow: '0 0 5px rgba(15, 15, 15, 0.26)',
    transform: 'translateY(-2vmax)',
  },
})

const RatingsSpan = styled('span')({
  margin: '0.5vmax',
  paddingBottom: '2px',
  color: '#faaf00',
  fontFamily: 'Roboto',
  fontSize: '1.2vmax',
})

function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/phone/${product._id}`} underline="none">
      <PhoneDetails>
        <img src={product.images[0]} alt={product.model} height="150px" />
        <p>{product.model}</p>
        <RatingsSpan>
          <Rating
            value={product.ratings}
            precision={0.5}
            size="small"
            readOnly
          />
          <RatingsSpan>{product.noReviews} reviews</RatingsSpan>
        </RatingsSpan>
        <p>{`€ ${product.price}`}</p>
      </PhoneDetails>
    </Link>
  )
}

export default ProductCard
