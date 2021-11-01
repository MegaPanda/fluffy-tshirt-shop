import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import { UserCheckoutForm } from "../reducers/checkoutSlice";

const PaymentForm = ({
        placeOrder
    }: {
        placeOrder: (data: UserCheckoutForm, isAccepted: boolean) => void
    }) => {
    
    // always scroll the page to the top when the component is mounted //
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const { register, handleSubmit, formState: { errors, isValid }, control } = useFormContext();

    return (
        <div className="bg-white p-4">
            <h1 className="text-2xl font-black mb-4">Payment Method</h1>
            <form onSubmit={handleSubmit((data: UserCheckoutForm) => placeOrder(data, true))}>
                <div>
                    <div className="py-4">
                        <label htmlFor="cardNumber" className="block text-sm font-black text-gray-500">Card Number</label>
                        <Controller
                            name="cardNumber"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Please enter the 16-digit card number.",
                                pattern: /(\d{4})\s(\d{4})\s(\d{4})\s(\d{4})/,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <InputMask 
                                    inputMode="tel"
                                    mask="9999 9999 9999 9999"
                                    maskPlaceholder=""
                                    value={value}
                                    onChange={onChange}
                                    className="w-full h-10 mt-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                />
                            )}
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
                            <Controller
                                name="validThru"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Valid thru date is required.",
                                    pattern: {
                                        value: /0[1-9]|1[0-2]\/\d{2}/,
                                        message: "The format is MM/YY",
                                    }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <InputMask
                                        inputMode="tel"
                                        mask="99/99"
                                        maskPlaceholder=""
                                        value={value}
                                        onChange={onChange}
                                        className="w-full h-10 mt-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                    />
                                )}
                            />
                            <ErrorMessage errors={errors} name="validThru" render={({ message }) => <p className="text-xs text-red-600 font-bold">{message}</p>} />
                        </div>
                        <div className="py-4">
                            <label htmlFor="CVC" className="block text-sm font-black text-gray-500">CVC</label>
                            <Controller 
                                name="CVC"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Please enter the CVC.",
                                    pattern: /\d{3}/,
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <InputMask 
                                        inputMode="tel"
                                        mask="999"
                                        maskPlaceholder=""
                                        value={value}
                                        onChange={onChange}
                                        className="w-full h-10 mt-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                    />
                                )}
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