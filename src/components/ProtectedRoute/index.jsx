import Cookies from 'js-cookie'
import { useNavigate, Route } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const jwtToken = Cookies.get('jwt_token')
  console.log(jwtToken)
  const navigation = useNavigate()

  if (!jwtToken) {
    navigation('/login')
  } else {
    return children
  }


}

export default ProtectedRoute