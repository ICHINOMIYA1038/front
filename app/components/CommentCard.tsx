import React, { useEffect } from 'react';
import {useState} from 'react';
import { useRouter } from 'next/router';
import { Button,Chip,TextField,Alert } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteButton from './Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import Cookies from "js-cookie";
import LoginPopup from "@/components/LoginPopup";
import CommentReplyCard from './CommentReplyCard';
import axios from 'axios';


function CommentCard({ comment }:any) {
    const router = useRouter()
    const [commentInput, setCommentInput] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    const handleCommentChange = (e) => {
        setCommentInput(e.target.value);
      };
    
      const handleCommentSubmit = () => {
        const payload = {
          post_id: comment.post_id,
          parent_comment_id: comment.comment_id,
          body: commentInput,
        };

        const headers= {
            "Content-Type": "application/json",
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            "access-token": Cookies.get("access-token"),
        }
        console.log(headers)

        axios.post('http://localhost:3000/comments', payload,  { headers })
        .then((response) => {
          // 送信成功時の処理
          setCommentInput('');
          router.reload();
        })
        .catch((error) => {
          console.log(error)
          // 送信失敗時の処理
          setIsError(true);
          setErrorMessage();
        });
    };
      

    return (
        <div className="CommentParentContainer">
        <div className="CommentUserProfile">
            <img src={comment.user_image_url} alt="Avatar" style={{ width: '80px', height: '80px' }} />
            <p>{comment.name}</p>
        </div>
        <div className='CommentContents'>
            <p>{comment.body}</p>
        </div>
        {comment.child_comments && comment.child_comments.map(child => (
          <CommentReplyCard key={child.post_id} comment={child} />
        ))
        
        }
       <hr />
       <div className="CommentInputContainer">
        <TextField
          value={commentInput}
          onChange={handleCommentChange}
          label="返信を入力してください"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
        <Button variant="contained" onClick={handleCommentSubmit}>送信</Button>
        {isError && (
            <Alert
              style={{width:"70%",display:"box",margin:"10px auto"}}
              onClose={() => {
                setIsError(false);
                setErrorMessage("");
              }}
              severity="error"
            >
              {errorMessage}
            </Alert>
          )}
      </div>
        </div>
);
}

export default CommentCard;