"use client"
import {useState,useEffect} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {
    const {data:session} = useSession();
    const router = useRouter();

    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const res = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await res.json();
        setPosts(data);
        //console.log(data);
    };

    useEffect(() => {
        if(session?.user.id) fetchPosts();
    },[]);

    const handleEdit = (post) => {
        console.log('edit')
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        console.log('delete')
        const hasConfirmed = confirm('Are you sure you want to delete this post?');
        if(hasConfirmed){
            try{
                const res = await fetch(`/api/prompt/${post._id.toString()}`,{
                    method: 'DELETE',
                });
                const data = await res.json();
                if(!res.ok) throw new Error(data.message);
                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts);
            }catch(error){
                console.log(error);
            }
        }
    }
  return (
    <Profile
    name="My"
    desc="Welcome to your personalized profile page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}/>
  )
}

export default MyProfile