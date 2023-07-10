import React, { useEffect } from 'react';
import {useState} from 'react';
import { useRouter } from 'next/router';
import { Button,Chip,TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteButton from './Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import Cookies from "js-cookie";
import LoginPopup from "@/components/LoginPopup";



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
    user_image_url:string
    name:string  
  }


  function ChangeNameforPlaytime(option:Number) {
    if (option === 0) {
      return "30分未満";
    } else if (option === 1) {
      return "30分以上〜60分未満";
    } else if (option === 2) {
      return "60分以上〜90分未満";
    } else if (option === 3) {
      return "90分以上〜120分未満";
    } else if (option === 4) {
      return "120分以上";
    }
  }


function PostCard({ post }:any) {
    const router = useRouter()
    const [isClicked, setIsClicked] = useState(false);
    const [isFavorite,setIsFavorite] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
      Favolist();
    }, []);


    async function Favo(){
        const response = await fetch(`http://localhost:3000/posts/${post.post_id}/favorites`, { method: 'POST' ,
          headers: {
            "Content-Type": "application/json",
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            "access-token": Cookies.get("access-token"),
          },
        });
        
        if (response.ok) {
          setIsFavorite(!isFavorite);
        } else {
          const data = await response.json();
          console.log(data.error); // エラーメッセージをコンソールに表示
          setErrorMessage(data.error);
          // エラーメッセージを表示するための処理を追加
          // 例えば、エラーメッセージをステートに設定して表示するなど
        }
      }

      async function DeleteFavo(){
        const response = await fetch(`http://localhost:3000/posts/${post.post_id}/favorites`, { method: 'DELETE' ,
          headers: {
            "Content-Type": "application/json",
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            "access-token": Cookies.get("access-token"),
          },
        });
        if (response.ok) {
          setIsFavorite(!isFavorite);
        } else {
          const data = await response.json();
          console.log(data.error); // エラーメッセージをコンソールに表示
      
          // エラーメッセージを表示するための処理を追加
          // 例えば、エラーメッセージをステートに設定して表示するなど
        }
      }

      async function Favolist(){
        const response = await fetch(`http://localhost:3000/post/${post.post_id}/favo`, { method: 'GET' ,
          headers: {
            "Content-Type": "application/json",
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            "access-token": Cookies.get("access-token"),
          },
        });
        if (response.ok) {
            const data = await response.json();
            if(data.result=="OK"){
                setIsFavorite(true)
            }else{
                setIsFavorite(false)
            }
          }

      }

      
  
    return (
  <div className={`PostCard ${isClicked ? 'clicked' : ''}`}>
    
    <div className="PostCardHeadar">
        <div className="PostCardHeaderLeft">
            <div className="PostCardUserProfile">
                <img src={post.user_image_url} alt="Avatar" style={{ width: '100px', height: '100px' }} />
                <p>{post.name}</p>
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
          <div className="tagsContainer">
            {post.tags &&
                          post.tags.map(elem => (
                            <Chip
                            key={elem}
                            label={elem.name}
                            clickable
                            style={{ margin: '0.5rem' }}
                          />
                  ))}
            

          </div>
            <div className="PlotDetail">
                <p>上演時間:{ChangeNameforPlaytime(post.playtime)}</p>
                <p>男:{post.number_of_men}</p>
                <p>女:{post.number_of_women}</p>
            </div>
            <img src={post.image_url} alt="Avatar" style={{ width: '200px', height: '200px' }} />
        </div>
    </div>
    <div className="PostCardFooter">
        <embed src={post.file_url} alt="Avatar" style={{ width: '660px', height: '450px' }}/>
    </div>
    <div className="impressionContainer">
    
        <div className='DownloadIcon'>
            <DownloadIcon id='interactive-icon' />
            <span className='icon_text'>download</span>
        </div>
        <div className='FavoriteIcon' onClick={() => {
            
            if(isFavorite){
                DeleteFavo()
            }else{
                Favo()
            }
            }
            
            }>
            <FavoriteIcon id='interactive-icon' style={{ color: isFavorite ? 'red' : 'black' }} />
            <span className='icon_text'>like</span>
        </div>
        <div className='ShareIcon'>
            <ShareIcon id='interactive-icon' />
            <span className='icon_text'>share</span>
        </div>
        <div className='VisibilityIcon'>
            <VisibilityIcon id='interactive-icon' />
            <span className='icon_text'>100 view</span>
        </div>
    </div>
    <div>      
      {errorMessage && (
        <LoginPopup errorMessage={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
      </div>
  </div>
);
}

export default PostCard;