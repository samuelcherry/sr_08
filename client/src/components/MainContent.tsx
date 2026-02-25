import {useState, useEffect} from 'react'
import fetchPosts from '../API/fetchPosts'

const dummyData = [{
    userid: 0, username: "WhiteTomBrady", content: "They call me white Tom Brady"
}]

const MainContent = () =>{

    const[posts, setPosts] = useState([])

    useEffect(()=>{
        fetchPosts()
    },[])


    useEffect(()=>{
        fetchPosts()
    },[posts])
    return(
        <>
            <div className="flex flex-col items-center">
                {dummyData.map((message) => (
                    <div
                        key={message.userid}
                        className="bg-gray-400 w-1/5 rounded-lg m-5 p-5"
                    >
                        <p className="font-bold text-white">{message.username}</p>
                        <p className="text-white">{message.content}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default MainContent