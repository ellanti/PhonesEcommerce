import styled from 'styled-components'

const LogoWrapper = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  column-gap: 10px;
`
const LogoImg = styled.div`
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  img {
    width: 100%;
    height: 70%;
  }
`
const LogoText = styled.div`
  color: #fab720;
  font-family: 'Audiowide';
  font-size: 0.9em;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-weight: 300;
    font-size: 0.8rem;
  }
`

function Logo() {
  return (
    <LogoWrapper>
      <LogoImg>
        <img src="/images/logoNew.png" alt="Mobile Corner Logo" />
      </LogoImg>
      <LogoText>
        MOBILE <span>CORNER</span>
      </LogoText>
    </LogoWrapper>
  )
}

export default Logo
