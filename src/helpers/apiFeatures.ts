type FilterParam = {
  lt?: number
  gt?: number
  lte?: number
  gte?: number
}
export type ProductQueryParam = {
  [key: string]: string | FilterParam | number | undefined
}

export const search = (queryParam: ProductQueryParam): Record<string, any> => {
  const keyword = queryParam.keyword
  const query = keyword ? { model: { $regex: keyword, $options: 'i' } } : {}
  return query
}

export const filter = (queryParam: ProductQueryParam): Record<string, any> => {
  // excluding the non-filter fields to get the right mongo query for filter
  const excludeFields = ['keyword', 'page', 'limit']
  excludeFields.map((key: string) => delete queryParam[key])
  let queryStr = JSON.stringify(queryParam)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
  return JSON.parse(queryStr)
}
