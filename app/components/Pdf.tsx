import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import * 'pdfjs-dist/build/pdf';

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

const Pdf:React.FC = ()=>{
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess=({ numPages }:any) => {
    setNumPages(numPages);
    console.log("ok")
  }

  return (
    <div>
      <Document file="https://www.africau.edu/images/default/sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default Pdf;