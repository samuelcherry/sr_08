import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Header = () =>{
const navigate = useNavigate()
const[post, setPost] = useState("")

const userId = localStorage.getItem("userId")

const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault()
        navigate("/login")
    }

const handlePost = async(e:React.ChangeEvent)=>{
    try {
        const response = await fetch("http://localhost:3000/posts", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(post, userId)
        })

        const data = await response.json()

        if(response.ok){
            console.log("data: ", data)
        }
    } catch (error) {
        
    }
    e.preventDefault()

}

    return(
        <div className="bg-gray-400 flex flex-col items-end">
            <button
                type="button"
                onClick={handleLogout}
                className="bg-white p-2 m-2 rounded-lg"> Log Out</button>
            <form onSubmit={handlePost}>
                <input
                    onChange={(e) => {setPost(e.target.value)}}
                    className="bg-white!"
                />
                <button
                    type="submit"
                    className="bg-white! p-2 m-2 rounded-lg"> POST </button>
            </form>
        </div>
    )
}

export default Header