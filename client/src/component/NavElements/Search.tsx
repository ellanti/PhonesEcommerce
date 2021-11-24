import { useState } from 'react'
import styled from 'styled-components'
import { RouteComponentProps, withRouter } from 'react-router'

const SearchInput = styled.input`
  font-size: 15px;
`
const SearchButton = styled.button`
  font-size: 15px;
  background: white;
  border-color: #fab720;
`
const SearchDiv = styled.div`
  margin: 0 auto;
`

type PrimarySearchProps = RouteComponentProps
const Search: React.FC<PrimarySearchProps> = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const searchHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    history.push(`/search/${keyword}`)
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
    // //setKeyword('')
  }
  return (
    <SearchDiv>
      <SearchInput
        type="text"
        placeholder="Search..."
        name="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <SearchButton type="submit" onClick={searchHandler}>
        <i className="fa fa-search"></i>
      </SearchButton>
    </SearchDiv>
  )
}

export default withRouter(Search)
