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


function CommentReplyCard({ comment }:any) {
    const router = useRouter()
    const [isClicked, setIsClicked] = useState(false);
    const [isFavorite,setIsFavorite] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    return (
        <div>
            <hr />
            <div className="CommentUserProfile">
                <img src={comment.user_image_url} alt="Avatar" style={{ width: '80px', height: '80px' }} />
                <p>{comment.name}</p>
            </div>
            <div className='CommentContents'>
                <p>{comment.body}</p>
            </div>
        </div>
    );
}

export default CommentReplyCard;