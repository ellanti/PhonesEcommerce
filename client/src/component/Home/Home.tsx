import { ChangeEvent, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Pagination from '@mui/material/Pagination'
import ProductCard from './ProductCard'
import { Product, ProductsResponse } from '../../redux/Products/ProductsTypes'
import Loader from '../layout/Loader/Loader'
import ErrorPage from '../layout/Error'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUrl } from '../../redux/Products/ProductsAction'
import { RootState } from '../../redux/store'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'

const StyledSlider = styled(Slider)({
  marginTop: '50px',
  marginLeft: '50px',
  paddingTop: '10px',
  color: 'black',
})

const StyledDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  columnGap: '5vw',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  '@media (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const BaseDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
})

const StyledPagination = styled(Pagination)({
  marginLeft: '38vw',
  marginBottom: '10vh',
})

const BASE_HOME_URL = 'http://localhost:5000/api/v1/phones/'

function Home() {
  const dispatch = useDispatch()
  let { keyword = '' }: { keyword: any } = useParams()
  const [page, setPage] = useState(1)
  const [priceRange, setPriceRange] = useState<number[]>([1, 1000])

  const handlePriceRange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[])
  }

  console.log('PriceRange:', priceRange)
  function priceValueText(value: number) {
    return `${value}€`
  }
  const setPageNo = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value)
    console.log('PageNumber:', page)
  }

  const url = `${BASE_HOME_URL}?keyword=${keyword}&page=${page}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}`
  console.log('url:', url)

  useEffect(() => {
    dispatch(fetchUrl(url))
  }, [dispatch, keyword, page, priceRange])

  const ProductsState = useSelector((state: RootState) => state.product)
  const { loading, data, error } = ProductsState

  let products: Product[] = []
  let paginationCount = 1
  if (data) {
    const productsResponse = data as ProductsResponse
    products = productsResponse.phones
    const resultPerPage = productsResponse.productsPerPage
    const productCount = productsResponse.productsCount
    const noPages = productCount / resultPerPage
    console.log(
      'resultsPerPage, productCount, noPages',
      resultPerPage,
      productCount,
      noPages
    )
    paginationCount = noPages === 0 ? 1 : noPages
  }
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorPage />
      ) : data ? (
        <BaseDiv>
          <div>
            <Stack sx={{ height: 300 }}>
              <StyledSlider
                size="small"
                orientation="vertical"
                track="inverted"
                aria-labelledby="track-inverted-slider"
                getAriaLabel={() => 'Price range'}
                value={priceRange}
                onChange={handlePriceRange}
                getAriaValueText={priceValueText}
                step={1}
                valueLabelDisplay="auto"
                marks
                min={1}
                max={1000}
              />
            </Stack>
          </div>
          <div>
            <StyledDiv>
              {products.map((product: Product) => {
                return (
                  <ProductCard
                    key={product._id}
                    product={product}
                  ></ProductCard>
                )
              })}
            </StyledDiv>

            <StyledPagination
              count={paginationCount}
              shape="rounded"
              variant="outlined"
              page={page}
              onChange={setPageNo}
            />
          </div>
        </BaseDiv>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default Home
