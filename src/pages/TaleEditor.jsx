import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TalePostForm from '../components/TalePostForm'
import Container from '../container/Container'

import post from '../appwrite/Post'



function TaleEditor() {
    const [post1,setPost]=useState(null)
    const {slug}=useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug)
        {
            post.getPost(slug).then((post1)=>
           { 
            if(post1)
            {
                setPost(post1)
            }
        }
    )
        }
        else{
            navigate('/')
        }

    },[slug,navigate])
  return post1?(
    <div className='py-8'>
        <Container>
                <TalePostForm post1={post1}/>
        </Container>
    </div>
  ):null
}

export default TaleEditor