import styled from 'styled-components'
const UserIcon = styled.i`
  color: #fab720;
  font-size: 1.8em;
`
function User() {
  return (
    <div>
      <UserIcon className="material-icons">person</UserIcon>
    </div>
  )
}

export default User
