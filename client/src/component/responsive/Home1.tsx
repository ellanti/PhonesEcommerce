import Banner from './Banner'
import Filters from './Filters'
import Products from './Products'
import styled from 'styled-components'

const ContentDiv = styled.div`
  padding: 3px 6px;
  margin: 0.6em 0.6em;
  display: flex;
  justify-content: space-around;
  gap: 0.6em;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
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
