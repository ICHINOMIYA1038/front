import Typography from '@mui/material/Typography';
import CreateIcon from '@mui/icons-material/Create';
import React from 'react';
import { useMediaQuery } from '@mui/material';


const PostLinkButton = ({func}) => {
  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FABFBF',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '3px 5px',
  };

  const iconStyle = {
    marginRight: '5px',
    color:'black'
  };
  const textStyle = {
    fontWeight: 'bold',
    color: 'black', // 黒色に設定
    userSelect: 'none', // 選択不可に設定
    whiteSpace:'nowrap',

  };

  const isMediumScreen = useMediaQuery((theme: { breakpoints: { up: (arg0: string) => any; }; }) => theme.breakpoints.up('sm'));

  return (
    <div style={buttonStyle}  onClick={func}>
      <CreateIcon style={iconStyle} />
      {isMediumScreen && <Typography style={textStyle}>脚本を投稿する</Typography>}
    </div>
  );
};

export default PostLinkButton;