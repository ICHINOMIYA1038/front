import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';

const Pdf:React.FC = ()=>{
  const isDisplay = useMediaQuery('(min-width:600px)');

  return (
    <div>
      {!isDisplay && <embed src="/sample.pdf" type="application/pdf" width="200px" height="400px" ></embed>}
      {isDisplay && <embed src="/sample.pdf" type="application/pdf" width="600px" height="800px" ></embed>}
    </div>
  );
}

export default Pdf;