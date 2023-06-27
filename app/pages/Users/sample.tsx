import React from 'react';
import Card from '../../components/Card'
import Sidebar from '@/components/Sidebar';
import Layout from '@/components/Layout';
import Pdf from '@/components/Pdf';



function Home({  }) {
  return (
    <Layout>
    <Pdf src="/sample.pdf" />
    </Layout>
  );
}


export default Home;