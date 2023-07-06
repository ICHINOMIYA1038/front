import React from 'react';
import Card from '../../components/Card'
import Sidebar from '@/components/Sidebar';
import Layout from '@/components/Layout';
import Pdf from '@/components/Pdf';
import TagSelecter from '@/components/TagSelecter';


function Home({  }) {
  return (
    <Layout>
    <TagSelecter/>
    </Layout>
  );
}


export default Home;