import { ChangeEvent, useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUrl } from '../../redux/Products/ProductsAction'
import { RootState } from '../../redux/store'
import { Product, ProductsResponse } from '../../redux/Products/ProductsTypes'
import ProductCard from '../Home/ProductCard'

const ProductsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ecf0f1;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.6em;
`
const NoProduct = styled.h2`
  color: #1d426f;
`
const StyledPagination = styled(Pagination)({
  margin: '0.6em',
})
const BASE_HOME_URL = 'http://localhost:5000/api/v1/phones/'

function Products() {
  const dispatch = useDispatch()
  let { keyword = '' }: { keyword: any } = useParams()
  const [page, setPage] = useState(1)
  const priceRange = useSelector(
    (state: RootState) => state.priceRange.priceRange
  )

  const setPageNo = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const url = `${BASE_HOME_URL}?keyword=${keyword}&page=${page}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}`

  useEffect(() => {
    dispatch(fetchUrl(url))
  }, [dispatch, keyword, page, priceRange])

  const ProductsState = useSelector((state: RootState) => state.product)
  const { data } = ProductsState

  let products: Product[] = []
  let productCount = 0
  let paginationCount = 1

  if (data) {
    const productsResponse = data as ProductsResponse
    products = productsResponse.phones
    const resultPerPage = productsResponse.productsPerPage
    productCount = productsResponse.productsCount
    const noPages = Math.ceil(productCount / resultPerPage)
    paginationCount = noPages === 0 ? 1 : noPages
  }
  return (
    <div>
      {productCount ? (
        <ProductsDiv>
          <StyledDiv>
            {products.map((product: Product) => {
              return (
                <ProductCard key={product._id} product={product}></ProductCard>
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
        </ProductsDiv>
      ) : (
        <NoProduct> No Phones to display </NoProduct>
      )}
    </div>
  )
}

export default Products
