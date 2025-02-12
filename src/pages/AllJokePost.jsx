import { useEffect, useState } from 'react';
import authService from '../appwrite/authService'; // Assuming you have an Auth module to get the user
import post from '../appwrite/Post';
import JokeCard from '../components/JokeCard';
import Container from '../container/Container';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Get the logged-in user's ID
        authService.getUser().then((user) => {
            if (user) {
                setUserId(user.$id);
            }
        }).catch(error => {
            console.error("Error fetching user:", error);
        });
    }, []);

    useEffect(() => {
        if (userId) {
            post.getAllPost([]).then((response) => {
                if (response?.documents) {
                    // Filter posts to show only those created by the logged-in user
                    const userPosts = response.documents.filter(postItem => postItem.userId === userId);
                    setPosts(userPosts);
                }
            }).catch(error => {
                console.error("Error fetching posts:", error);
            });
        }
    }, [userId]); // Fetch posts only after userId is set

    return (
        
            <div>
            <Container>
                <div className='flex flex-wrap py-10'>
                    {posts.length > 0 ? (
                        posts.map((postItem) => (
                            <div key={postItem.$id} className='p-2 w-1/4'>
                                <JokeCard {...postItem} />
                            </div>
                        ))
                    ) : (
                        <p>No posts found.</p>
                    )}
                </div>
            </Container>
            </div>
           
    
    );
}

export default AllPosts;
