import Banner from './Banner'
import Filters from './Filters'
import Products from './Products'
import styled from 'styled-components'

const ContentDiv = styled.div`
  margin: 0.3em 0.3em;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 0.3em;
`
function Home1() {
  return (
    <div>
      <Banner></Banner>
      <ContentDiv>
        <Filters></Filters>
        <Products></Products>
      </ContentDiv>
    </div>
  )
}

export default Home1
