import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useFormContext } from "react-hook-form";
import { UserCheckoutForm } from "../reducers/checkoutSlice";

const PaymentForm = ({
        placeOrder
    }: {
        placeOrder: (data: UserCheckoutForm, isAccepted: boolean) => void
    }) => {
    
    const { register, handleSubmit, formState: { errors, isValid } } = useFormContext();

    const preventNonDigit = (value: string) => value.replace(/\D/g, "");
    const maskCardNumber = (value: string) => {
        return preventNonDigit(value).match(/\d{1,4}/g)?.join(" ").substr(0, 19) || "";
        // any non digit input will be replace by blank space //
        // every four digits will be seperated by a space //
        // max length is 19 = 16 digits + 3 spaces //
    };
    const maskValidThru = (value: string) => {
        return preventNonDigit(value).match(/\d{1,2}/g)?.join(" / ").substr(0, 7) || "";
    };
    const maskCVC = (value: string) => {
        return preventNonDigit(value).substr(0, 3);
    };

    return (
        <div className="bg-white p-4">
            <h1 className="text-2xl font-black mb-4">Payment Method</h1>
            <form onSubmit={handleSubmit((data: UserCheckoutForm) => placeOrder(data, true))}>
                <div>
                    <div className="py-4">
                        <label htmlFor="cardNumber" className="block text-sm font-black text-gray-500">Card Number</label>
                        <input type="tel" placeholder="0000 0000 0000 0000" inputMode="numeric" 
                            {...register("cardNumber", { 
                                required: "Please enter your card number.", 
                                pattern: {
                                    value: /(\d{4})\s(\d{4})\s(\d{4})\s(\d{4})/,
                                    message: "Card number should be 16 digits.",
                                },
                                onChange: (event) => {
                                    const { value } = event.target; 
                                    event.target.value = maskCardNumber(value); 
                                }, 
                            })}
                            className="w-full h-10 mt-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                        <ErrorMessage errors={errors} name="cardNumber" render={({message}) => <p className="text-xs text-red-600 font-bold">{message}</p>} />
                    </div>
                    <div className="py-4">
                        <label htmlFor="cardHolder" className="block text-sm font-black text-gray-500">Card Holder</label>
                        <input type="text" {...register("cardHolder", { required: "Please enter the card holder's name." })}
                            className="w-full h-10 mt-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                        <ErrorMessage errors={errors} name="cardHolder" render={({message}) => <p className="text-xs text-red-600 font-bold">{message}</p>} />
                    </div>
                    <div className="flex justify-between gap-4">
                        <div className="py-4">
                            <label htmlFor="validThru" className="block text-sm font-black text-gray-500">Valid Thru</label>
                            <input type="tel" placeholder="00 / 00" 
                                {...register("validThru", { 
                                    required: "Please enter the valid thru date.",
                                    pattern: {
                                        value: /(\d{2})\s\/\s(\d{2})/,
                                        message: "The format should be in 4 digits.",
                                    },
                                    onChange: (event) => {
                                        const { value } = event.target;
                                        event.target.value = maskValidThru(value);
                                    },
                                })}
                                className="w-full h-10 mt-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            />
                            <ErrorMessage errors={errors} name="validThru" render={({ message }) => <p className="text-xs text-red-600 font-bold">{message}</p>} />
                        </div>
                        <div className="py-4">
                            <label htmlFor="CVC" className="block text-sm font-black text-gray-500">CVC</label>
                            <input type="tel" 
                                {...register("CVC", { 
                                    required: "Please enter the card CVC.",
                                    pattern: {
                                        value: /\d{3}/,
                                        message: "CVC should be 3 digits.",
                                    },
                                    onChange: (event) => {
                                        const { value } = event.target;
                                        event.target.value = maskCVC(value);
                                    },
                                })}
                            className="w-full h-10 mt-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            />
                            <ErrorMessage errors={errors} name="CVC" render={({message}) => <p className="text-xs text-red-600 font-bold">{message}</p>} />
                        </div>
                    </div>
                </div>
                {isValid
                    ? <button type="submit" className="block w-full mt-4 px-4 py-2 rounded bg-green-600 hover:bg-green-800 text-white font-bold">CONFIRM PAYMENT</button>
                    : <button type="submit" disabled className="cursor-default block w-full mt-4 px-4 py-2 rounded bg-gray-600 text-gray-400 font-bold">CONFIRM PAYMENT</button>
                }
            </form>
        </div>
    )
};

export default PaymentForm;