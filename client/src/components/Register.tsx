import {useState} from "react"
import { useNavigate } from "react-router-dom"

const Register = () =>{

    const[email, setEmail] = useState("")
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleRegister = async(e: React.ChangeEvent) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/register" ,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username, email, password}),
            })

            if(response.ok){
                navigate("/login")
            }

        } catch (error) {
            
        }

    }

    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault()
        navigate("/login")
    }

    return(
        <>
            <div className="flex justify-center">
                <form
                    onSubmit={handleRegister} 
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
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => {setUsername(e.target.value)}}
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
                            Register
                        </button>
                        <button
                            type="button"
                            onClick={handleBack}
                            className="bg-white rounded-lg p-2 m-2 ">
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register