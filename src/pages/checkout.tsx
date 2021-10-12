import React from 'react';
import AddressForm from '../components/addressForm';

const Checkout = () => {
    return (
        <div className="py-32 px-6 max-w-lg m-auto">
            <h1 className="text-3xl font-black mb-4">Shipping Address</h1>
            <AddressForm></AddressForm>
        </div>
    )
};

export default Checkout;