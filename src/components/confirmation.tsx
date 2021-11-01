import React, { useEffect } from "react";
import { useAppSelector } from "../custom-hooks/useAppSelector";

const Confirmation = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const checkoutData = useAppSelector(state => state.checkout);

    return (
        <div className="bg-white p-4 text-center">
            <h1 className="text-2xl font-black mb-4">Order confirmed.</h1>
            <p>Thank you, {checkoutData.customer.fistname}!</p>
            <p>Your goods are on the way!</p>
        </div>
    )
};

export default Confirmation;