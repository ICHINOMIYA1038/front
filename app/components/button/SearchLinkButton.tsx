import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { useMediaQuery } from '@mui/material';

const SearchLinkButton = ({func}:any) => {
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
    color: 'black',
    userSelect: 'none' as const,
    whiteSpace: 'nowrap' as const, // 正しい型に修正
  };

  const isMediumScreen = useMediaQuery((theme: { breakpoints: { up: (arg0: string) => any; }; }) => theme.breakpoints.up('sm'));
  return (
    <div style={buttonStyle} onClick={func}>
      <SearchIcon style={iconStyle} />
      {isMediumScreen && <Typography style={textStyle}>脚本を探す</Typography>}
      
    </div>
  );
};

export default SearchLinkButton;