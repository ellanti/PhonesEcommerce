import Link from '@mui/material/Link'
import Rating from '@mui/material/Rating'
import { styled } from '@mui/material/styles'

const PhoneProductCard = styled('div')({
  width: '210px',
  height: '240px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  color: 'black',
  paddingTop: '10px',
  marginTop: '6px',
  marginBottom: '6px',
  boxShadow: '0 0 1px rgba(15, 15, 15, 0.26)',
  '&:hover': {
    boxShadow: '0 0 1px rgba(15, 15, 15, 0.26)',
    transform: 'translateY(-1vmax)',
  },
})

const PhoneDetails = styled('div')({
  color: '#1d426f',
  fontWeight: 'bold',
  fontSize: '1.8vh',
  fontFamily: 'Montserrat, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const RatingSpan = styled('span')({
  margin: '0.5vmax',
  paddingBottom: '2px',
  color: '#fab720',
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.9vmax',
})

function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/phone/${product._id}`} underline="none">
      <PhoneProductCard>
        <img
          src={product.images[0]}
          alt={product.model}
          height="150px"
          width="130px"
        />
        <PhoneDetails>
          <div>{product.model}</div>
          <div>
            <Rating
              value={product.ratings}
              precision={0.5}
              size="small"
              readOnly
            />
            <RatingSpan>{product.noReviews} reviews</RatingSpan>
          </div>
          <div>{`€ ${product.price}`}</div>
        </PhoneDetails>
      </PhoneProductCard>
    </Link>
  )
}

export default ProductCard
