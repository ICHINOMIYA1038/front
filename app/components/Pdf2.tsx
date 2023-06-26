import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https:////unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Pdf:React.FC = ()=>{
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess=({ numPages }:any) => {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file="Django3.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default Pdf;