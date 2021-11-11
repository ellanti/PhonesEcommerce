import styled from 'styled-components'
import Logo from '../NavElements/Logo'
import Search from '../NavElements/Search'
import Cart from '../NavElements/Cart'
import User from '../NavElements/User'

const NavBarContainer = styled.div`
  width: 100%;
  height: 60px;
  box-shadow: 0 1px 3px rgba(15, 15, 15, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1d426f;
  @media (max-width: 768px) {
    height: 90px;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 50%;
  }
`
const LeftSection = styled.div`
  display: flex;
  padding: 6px 12px;
  @media (max-width: 768px) {
    order: 1;
  }
`
const MiddleSection = styled.div`
  display: flex;
  @media (max-width: 768px) {
    order: 3;
    flex: 1 0 100%;
  }
`
const RightSection = styled.div`
  display: flex;
  column-gap: 1em;
  padding: 6px 12px;
  @media (max-width: 768px) {
    order: 2;
  }
`
function NavBar() {
  return (
    <NavBarContainer>
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
    </NavBarContainer>
  )
}

export default NavBar
