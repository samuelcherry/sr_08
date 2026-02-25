import {useState} from "react"
import { useNavigate } from "react-router-dom"

const Login = () =>{

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = async(e: React.ChangeEvent) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({email, password})
            })

            const data = await response.json()

            console.log("response: ", data)
            if(response.ok){
                console.log("Login Successful")
                localStorage.setItem("token", data.token)
                localStorage.setItem("userId", data.token.id)
                navigate("/")
            }else{
                console.error("Login error")
            }
        
        
        } catch (error) {
            console.error("Login Failed", error)
        }
    }

    const handleRegister = (e: React.MouseEvent) => {
        e.preventDefault()
        navigate("/register")
    }

    return(
        <>
            <div className="flex justify-center">
                <form
                    onSubmit={handleLogin} 
                    className="bg-gray-400 p-5 m-5 w-1/5 rounded-lg flex flex-col items-center">
                    <div className="flex flex-col items-center">
                        <input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            className="bg-white w-full p-4 m-2"
                        />
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            className="bg-white w-full p-4 m-2"
                        />
                    </div>
                    <div className="flex justify-between w-full">
                        <button
                            type="submit"
                            className="bg-white! rounded-lg p-2 m-2">
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={handleRegister}
                            className="bg-white rounded-lg p-2 m-2 ">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login