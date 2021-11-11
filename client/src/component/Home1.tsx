import styled from 'styled-components'

const ImgDiv = styled.div`
  height: 80vh;
  width: 80vw;
  margin: 3vw auto;
`
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`

function Home1() {
  return (
    <ImgDiv>
      <Image src="HomePic.jpg" alt="mobile" />
    </ImgDiv>
  )
}

export default Home1
