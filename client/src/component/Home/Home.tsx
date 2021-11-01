import { styled } from '@mui/material/styles'
import ProductCard from './ProductCard'
import useFetchUrl from '../../CustomHooks/useFetchUrl'
import { Product } from '../../redux/Products/ProductsTypes'
import Loader from '../layout/Loader/Loader'
import ErrorPage from '../layout/Error'

const StyledDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

function Home() {
  const ProductsState = useFetchUrl('http://localhost:5000/api/v1/phones/')
  const { loading, data, error } = ProductsState
  console.log('Data:**************', data)
  const products = data as Product[]
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorPage />
      ) : (
        <StyledDiv>
          {products.map((product: Product) => {
            return (
              <ProductCard key={product._id} product={product}></ProductCard>
            )
          })}
        </StyledDiv>
      )}
    </div>
  )
}

export default Home
