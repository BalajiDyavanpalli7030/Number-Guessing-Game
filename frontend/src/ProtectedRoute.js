import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children, userSignInDetails}) =>{
    if (!userSignInDetails?.email){
        return <Navigate to='/'/>
    }
    return children
}

export default ProtectedRoute