import styled from 'styled-components'

const ImgDiv = styled.div`
  width: 100%;
  margin-top: 90px;
  min-width: 240px;
  overflow: hidden;
  position: relative;
<<<<<<< HEAD
  height: 60vh;
  border: 1px #fab720;
=======
  height: 40vh;
  border: 6px #fab720;
>>>>>>> parent of 6cdeaaf... products display
  border-style: solid none;
`
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`
const TextDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(61, 61, 61);
  border: 2px solid #1d426f;
  border-radius: 6px;
  padding: 0.3em 0.6em;
  background: rgba(255, 255, 255, 0.7);
  text-align: center;
  p {
    font-weight: bold;
    word-spacing: 0.3em;
    font-family: 'Montserrat', sans-serif;
  }
  @media (max-width: 540px) {
    p {
      font-size: 1.8vh;
      font-weight: bold;
    }
  }
`
const ShopName = styled.div`
  display: inline-block;
  color: #1d426f;
  background-color: #fab720;
  font-family: Audiowide;
  @media (max-width: 540px) {
    font-size: 1.8vh;
  }
`

function Banner() {
  return (
    <ImgDiv>
      <TextDiv>
        <p>
          Mobile phones are no more merely a part of our lives. From budget to
          state-of-the-art smartphones, indigenous names to global big-wigs - a
          whole universe of mobiles await you on
        </p>
        <ShopName>MOBILE CORNER</ShopName>
      </TextDiv>
      <Image src="/images/HomePic7.jpg" alt="mobile" />
    </ImgDiv>
  )
}

export default Banner
