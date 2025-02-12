import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import JokePostForm from '../components/JokePostForm'
import Container from '../container/Container'

import post from '../appwrite/Post'

function JokeEditor() {
    const [post1,setPost]=useState(null)
    const {slug}=useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug)
        {
            post.getPost(slug).then((post)=>{
                if(post)
                {
                    setPost(post)
                }
            })
        }
        else{
            navigate('/posts')
        }
    },[slug, navigate])
    return post1?(
        <div className='py-8'>
            <Container>
                    <JokePostForm post={post1}/>
            </Container>
        </div>
      ):null
}

export default JokeEditor