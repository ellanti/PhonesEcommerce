import Link from '@mui/material/Link'
import Rating from '@mui/material/Rating'
import { styled } from '@mui/material/styles'

const PhoneCard = styled('div')({
  width: '30%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'black',
  marginTop: '8vh',
  marginBottom: '8vh',
  '&:hover': {
    boxShadow: '0 0 5px rgba(15, 15, 15, 0.26)',
    transform: 'translateY(-1vmax)',
  },
})

function ProductCard({ product }: { product: any }) {
  return (
    <PhoneCard>
      <Link href={`/phone/${product._id}`} underline="none">
        <img src={product.images[0]} alt={product.model} height="150px" />
        <p>{product.model}</p>
        <div>
          <Rating
            value={product.ratings}
            precision={0.5}
            size="small"
            readOnly
          />
          <span>{product.noReviews} reviews</span>
        </div>

        <p>{`€ ${product.price}`}</p>
      </Link>
    </PhoneCard>
  )
}

export default ProductCard
