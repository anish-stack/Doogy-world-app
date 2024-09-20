import React from 'react'
import Header from '../../components/Header/Header'
import HederSlide from '../../components/Header/HederSlide'
import { Route, Routes } from 'react-router-dom'
import CreateProduct from '../Product/CreateProduct'
import './home.css'
import { Toaster } from 'react-hot-toast'
const Home = () => {
    return (
        <div class="page-wrapper compact-wrapper" id="pageWrapper">
                <div class="tap-top"><i class="iconly-Arrow-Up icli"></i></div>
            <Header/>
              
            <div class="page-body-wrapper">
            <HederSlide/>
            <div class="page-body">
                <Routes>
                    <Route path='/products/create' element={<CreateProduct/>}   />
                </Routes>
            </div>
            </div>
            <Toaster/>
        </div>
    )
}

export default Home