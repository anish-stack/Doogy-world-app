import React from 'react'
import Layout from '../components/Layout/Layout'
import Topbar from '../components/Topbar/Topbar'
import Header from '../components/Layout/Header'
import Category from '../components/Category/Category'
import TopDoctor from '../components/Topdoctor/TopDoctor'
import Banner from '../components/Banner/Banner'
import OnlineDoctor from '../components/Doctor/OnlineDoctor'
import Blog from '../components/Blog/Blog'

const Home = () => {
  return (
    <Layout>
      <Topbar />
      <Header />
      <Category />
      <TopDoctor />
      <Banner />
      <OnlineDoctor />
      <Blog />
    </Layout>
  )
}

export default Home