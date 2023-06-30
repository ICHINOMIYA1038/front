import React from 'react';
import {useState} from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteButton from './Delete';


interface Post {
    post_id: number;
    content: string;
    user_id: string;
    title:string,
    synopsis:string,
    catchphrase:string,
    number_of_men:string,
    number_of_women:string,
    total_number_of_people:string,
    playtime:string,
    image_url:string,
    file_url:string,
  
  
  }

function PostCard({ post }:Post) {
    const router = useRouter()
    const [isClicked, setIsClicked] = useState(false);

  return (
  <div className={`card ${isClicked ? 'clicked' : ''}`}>
    
    <div className="PostCardHeadar">
        <div className="PostCardHeaderLeft">
            <div className="PostCardUserProfile">
                <img src={post.user_image_url} alt="Avatar" style={{ width: '100px', height: '100px' }} />
                <p>{post.user_name}</p>
            </div>
            <div className="PostCardTitle">
                <p>{post.title}</p>
            </div>
            <div className="PostCardDescription">
                <p>{post.catchphrase}</p>
            </div>
            <Button/>
        </div>
        <div className="PostCardHeaderRight">
            <div className="PlotDetail">
                <p>上演時間:{post.playTime}</p>
                <p>男:{post.number_of_men}</p>
                <p>女:{post.number_of_women}</p>
            </div>
            <img src={post.image_url} alt="Avatar" style={{ width: '100px', height: '100px' }} />
        </div>
    </div>
    <div className="PostCardHooter"></div>
    
  </div>
);
}

export default PostCard;