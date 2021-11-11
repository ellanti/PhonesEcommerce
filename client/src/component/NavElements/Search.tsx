import styled from 'styled-components'

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
function Search() {
  return (
    <SearchDiv>
      <SearchInput type="text" placeholder="Search..." name="search" />
      <SearchButton type="submit">
        <i className="fa fa-search"></i>
      </SearchButton>
    </SearchDiv>
  )
}

export default Search
