import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import AddressForm from '../components/addressForm';
import Confirmation from '../components/confirmation';
import OrderReview from '../components/orderReview';
import PaymentForm from '../components/paymentForm';
import ProgressBar from '../components/progressBar';
import { BasketState, clearBasket } from '../reducers/basketSlice';
import { updateData, UserCheckoutForm } from '../reducers/checkoutSlice';

const Checkout = ({basket_state}: {basket_state: BasketState}) => {
    window.scrollTo({top: 0});

    const dispatch = useDispatch();

    const methods = useForm<UserCheckoutForm>({
        defaultValues: { 
            firstname: '',
            lastname: '',
            shipAddress: '',
            city: '',
            postcode: '',
            country: '',
            cardNumber: '',
            cardHolder: '',
            validThru: '',
            CVC: '',
        },
    });

    const [checkoutState, setCheckoutState] = useState<string>("address");
    const nextStep = (data: UserCheckoutForm, page: string) => {
        dispatch(updateData(data));
        setCheckoutState(page);
    };
    const prevStep = (page: string) => {
        setCheckoutState(page);
    };
    const placeOrder = (data: UserCheckoutForm, isAccepted: boolean) => {
        dispatch(updateData(data));
        if (isAccepted) {
            dispatch(clearBasket());
            setCheckoutState("complete");
        } else {
            setCheckoutState("complete");
        }
    };
    
    return (
        <div className="pt-24 sm:pt-32 pb-32 px-4 max-w-lg m-auto">
            <ProgressBar currentStep={checkoutState} />
            {checkoutState === "address" && 
                <FormProvider {...methods}>
                    <AddressForm total_quantity={basket_state.total_quantity} nextStep={nextStep} />
                </FormProvider>
            }
            {checkoutState === "payment" && 
                <div className="sm:flex">
                    <OrderReview basket_state={basket_state} />
                    <div>
                        <button onClick={() => prevStep("address")} className="p-2 text-xs text-gray-600 font-bold"><span className="material-icons text-xs align-bottom">arrow_back_ios_new</span>&nbsp;ADDRESS</button>
                        <FormProvider {...methods}>
                            <PaymentForm placeOrder={placeOrder} />
                        </FormProvider>
                    </div>
                </div>
            }
            {checkoutState === "complete" &&
                <Confirmation />
            }
        </div>
    )
};

export default Checkout;