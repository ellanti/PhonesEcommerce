import styled from 'styled-components'
import Logo from '../NavElements/Logo'
import Search from '../NavElements/Search'
import Cart from '../NavElements/Cart'
import User from '../NavElements/User'

const NavBarContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  min-width: 240px;
  overflow: hidden;
  background: #1d426f;
  height: 90px;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  flex-wrap: wrap;
`
const NavDeskContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`

const NavMobContainer = styled.div`
  display: none;
  width: 100%;
  @media (max-width: 540px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
const LeftSection = styled.div`
  display: flex;
  padding: 3px 6px;
`
const MiddleSection = styled.div`
  display: flex;
  @media (max-width: 540px) {
    display: none;
  }
`
const RightSection = styled.div`
  display: flex;
  column-gap: 1.2em;
  padding: 3px 6px;
`
function NavBar() {
  return (
    <NavBarContainer>
      <NavDeskContainer>
        <LeftSection>
          <Logo />
        </LeftSection>
        <MiddleSection>
          <Search />
        </MiddleSection>
        <RightSection>
          <Cart />
          <User />
        </RightSection>
      </NavDeskContainer>
      <NavMobContainer>
        <Search />
      </NavMobContainer>
    </NavBarContainer>
  )
}

export default NavBar
