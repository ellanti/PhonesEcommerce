export const URL_FETCH_SUCCESS = 'URL_FETCH_SUCCESS'
export const URL_FETCH_REQUEST = 'URL_FETCH_REQUEST'
export const URL_FETCH_FAILURE = 'URL_FETCH_FAILURE'

export type urlState = {
  loading: boolean
  data: any
  error: string
}

export type Product = {
  _id: string
  ratings: number
  images: string[]
  noReviews: number
  model: string
  price: number
  stock: 1
  brand: string
  reviews: ReviewType[]
}

export type ReviewType = {
  rating: number
  comment: string
  productId: string
}
export type ProductsResponse = {
  phones: Product[]
  productsPerPage: number
  productsCount: number
}
