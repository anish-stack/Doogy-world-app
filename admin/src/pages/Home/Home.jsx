import React from 'react'
import Header from '../../components/Header/Header'
import HederSlide from '../../components/Header/HederSlide'
import { Route, Routes } from 'react-router-dom'
import CreateProduct from '../Product/CreateProduct'
import './home.css'
import { Toaster } from 'react-hot-toast'
import GetAllProduct from '../Product/GetAllProduct'
import EditProduct from '../Product/EditProduct'
import ManageCategory from '../Category/ManageCategory'
import CreateCategoryModel from '../Category/CreateCategory'
import EditCategory from '../Category/EditCategory'
import CreateVouchers from '../Vouchers/CreateVouchers'
const Home = () => {
    return (
        <div class="page-wrapper compact-wrapper" id="pageWrapper">
            <div class="tap-top"><i class="iconly-Arrow-Up icli"></i></div>
            <Header />

            <div class="page-body-wrapper">
                <HederSlide />
                <div class="page-body">
                    <Routes>
                        <Route path='/products/create' element={<CreateProduct />} />
                        <Route path='/products/manage' element={<GetAllProduct />} />
                        <Route path='/products/edit' element={<EditProduct />} />
                        <Route path='/category/manage' element={<ManageCategory />} />
                        <Route path='/category/create' element={<CreateCategoryModel />} />
                        <Route path='/category/edit' element={<EditCategory />} />
                        <Route path='/vouchers/create' element={<CreateVouchers />} />



                    </Routes>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Home