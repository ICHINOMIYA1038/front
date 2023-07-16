import { Grid, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  FacebookShareButton,
  HatenaShareButton,
  LineShareButton,
  TwitterShareButton,
  FacebookIcon,
  HatenaIcon,
  LineIcon,
  TwitterIcon,
} from "react-share";

const URL = 'https://localhost:8000/';
const QUOTE = '共有するときのメッセージ';

const ShareButton = ({onClose}) => {
    const handleClose = onClose


  return (
    <div className="popup">
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FacebookShareButton url={URL} quote={QUOTE}>
          <FacebookIcon size={24} round />
        </FacebookShareButton>
      </Grid>
      <Grid item xs={6}>
        <TwitterShareButton url={URL} title={QUOTE}>
          <TwitterIcon size={24} round />
        </TwitterShareButton>
      </Grid>
      <Grid item xs={6}>
        <LineShareButton url={URL} title={QUOTE}>
          <LineIcon size={24} round />
        </LineShareButton>
      </Grid>
      <Grid item xs={6}>
        <HatenaShareButton
          url={URL}
          title={QUOTE}
          windowWidth={660}
          windowHeight={460}
        >
          <HatenaIcon size={24} round />
        </HatenaShareButton>
      </Grid>

      <Grid item xs={12}>
      <div className="close-button">
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </div>
      </Grid>
    </Grid>
    </div>
  );
}

export default ShareButton;
