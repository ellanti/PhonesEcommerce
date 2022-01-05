import { useEffect } from 'react'

import Banner from '../Banner'
import Products from '../Products'
import styled from 'styled-components'

const ContentDiv = styled.div`
  width: 100%;
  margin: 0.6em 0.6em;
  display: flex;
`
function Home1() {
  useEffect(() => {}, [])
  return (
    <div>
      <Banner></Banner>
      <ContentDiv>
        <Products></Products>
      </ContentDiv>
    </div>
  )
}

export default Home1
