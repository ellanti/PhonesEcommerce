import { useParams } from 'react-router'
import useFetchUrl from '../../CustomHooks/useFetchUrl'
import Rating from '@mui/material/Rating'
import { Product } from '../../redux/Products/ProductsTypes'
import Loader from '../layout/Loader/Loader'
import ErrorPage from '../layout/Error'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const PhoneBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  columnGap: '100px',
  height: '60vh',
  width: '60vw',
  margin: '2vw 20vw',
  boxShadow: '0 0 5px rgba(15, 15, 15, 0.26)',
})
const PhoneImg = styled('img')({
  objectFit: 'cover',
  height: '50vh',
})
const PName = styled('p')({
  fontFamily: 'Crimson Text',
  fontSize: '2vw',
})
const PhoneData = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Proxima Nova',
})

function PhonePage() {
  const { phoneId }: { phoneId: string } = useParams()
  const ProductState = useFetchUrl(
    `http://localhost:5000/api/v1/phones/phone/${phoneId}`
  )
  const { loading, data, error } = ProductState
  let product = data ? (data as Product) : null
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorPage />
      ) : product ? (
        <PhoneBox>
          <PhoneImg src={product.images[0]} alt={product.model} />

          <PhoneData>
            <PName>{product.model}</PName>
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
          </PhoneData>
        </PhoneBox>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default PhonePage
