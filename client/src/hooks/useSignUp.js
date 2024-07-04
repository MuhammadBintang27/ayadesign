import { message } from "antd"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

const useSignUp = () => {
    const {login} = useAuth()
    const {error, setError} = useState(null)
    const {loading, setLoading} = useState(false)

    const registerUser = async (values) => {
        if (values.password !== values.passwordConfirm) {
            return setError('Passwords do not match')
        }
        try{
            setError(null)
            setLoading(false)
            const res = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify(values),
            })
            const data = await res.json()
            if(res.status === 201){
                message.success(data.message)
                login(data.token, data.user)
            }else if(res.status === 4000){
                setError(data.message)
            }else{
                message.error('Registration Failed')
            }
        } catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
  return{ loading, error, registerUser }
}

export default useSignUp