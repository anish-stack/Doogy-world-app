import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import FormGroups from '../../components/Forms/FormGroups';
import Input from '../../components/Forms/Input';
import axios from 'axios';
import Toggle from '../../components/Forms/toggle';

const CreateVouchers = () => {
    const [formData, setFormData] = useState({
        CouponCode: '',
        MinimumAmount: '',
        HowMuchPercentageOf: '',
        Active: true
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        setError(''); 
        setSuccess(''); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Validation for MinimumAmount
        if (parseFloat(formData.MinimumAmount) <= 249) {
            setError('Minimum Amount must be greater than 249.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/Product/vouchers/create-vouchers`, formData);
            setSuccess('Voucher created successfully!');
            setFormData({
                CouponCode: '',
                MinimumAmount: '',
                HowMuchPercentageOf: '',
                Active: true
            }); 
            
       
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.error);
            setLoading(false);
        }
    };

    const handleToggle = () => {
        setFormData((prevData) => ({
            ...prevData,
            Active: !prevData.Active
        }));
    };

    return (
        <div className='page-body'>
            <Breadcrumb heading={'Create Voucher'} subHeading={'Vouchers'} LastHeading={'Create Voucher'} />
            {success && <div className="alert alert-success">{success}</div>}
            <FormGroups onSubmit={handleSubmit} Elements={
                <div className='row'>
                    <div className="col-md-6">
                        <label htmlFor="CouponCode">Coupon Code</label>
                        <Input
                            type="text"
                            name="CouponCode"
                            value={formData.CouponCode}
                            onChange={handleChange}
                            placeholder="Enter Coupon Code"
                            className="my-custom-class"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="MinimumAmount">Minimum Amount</label>
                        <Input
                            type="number"
                            name="MinimumAmount"
                            value={formData.MinimumAmount}
                            onChange={handleChange}
                            placeholder="Enter Minimum Amount"
                            className="my-custom-class"
                            required
                        />
                    </div>
                    <div className="col-md-6 mt-2">
                        <label htmlFor="HowMuchPercentageOf">Percentage Off</label>
                        <Input
                            type="number"
                            name="HowMuchPercentageOf"
                            value={formData.HowMuchPercentageOf}
                            onChange={handleChange}
                            placeholder="Enter Percentage"
                            className="my-custom-class"
                            required
                        />
                    </div>
                    <div className="col-md-6 mt-2">
                        <label htmlFor="Active">Status Of Voucher</label>
                        <Toggle
                            isActive={formData.Active}
                            onToggle={handleToggle}
                        />
                    </div>
                    {error && <div className="error-message mt-4 text-danger">{error}</div>}
               
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Loading...' : 'Create Voucher'}
                        </button>
                    </div>
                </div>
            } />
        </div>
    );
};

export default CreateVouchers;
