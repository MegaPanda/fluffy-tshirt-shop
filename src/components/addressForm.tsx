import React, { useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Link } from 'react-router-dom';

const AddressForm = () => {
    interface country {
        value: string;
        label: string;
    }
    const country_list: country[] = useMemo(() => countryList().getData(), []);
    
    interface UserShippingForm {
        firstname: string;
        lastname: string;
        address: string;
        city: string;
        postcode: number;
        country: string;
    };

    const { register, formState: { errors }, control, handleSubmit } = useForm<UserShippingForm>();
    const onSubmit: SubmitHandler<UserShippingForm> = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="sm:flex sm:justify-between">
                <div className="py-4">
                    <label htmlFor="firstname" className="block font-black text-gray-500">First Name:</label>
                    <input type="text" {...register("firstname", { required: "Your first name is required." })}
                        className="w-full h-10 mt-2 px-3 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" 
                    />
                    <ErrorMessage errors={errors} name="firstname" render={({message}) => <p className="text-red-600 font-bold">{message}</p>} />
                </div>
                <div className="py-4">
                    <label htmlFor="lastname" className="block font-black text-gray-500">Last Name:</label>
                    <input type="text" {...register("lastname", { required: "Your last name is required." })}
                        className="w-full h-10 mt-2 px-3 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" 
                    />
                    <ErrorMessage errors={errors} name="lastname" render={({message}) => <p className="text-red-600 font-bold">{message}</p>} />
                </div>
            </div>
            <div className="py-4">
                <label htmlFor="address" className="block font-black text-gray-500">Address:</label>  
                <input type="text" {...register("address", { required: "Please enter your address." })}
                    className="w-full h-10 mt-2 px-3 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" 
                />
                <ErrorMessage errors={errors} name="address" render={({message}) => <p className="text-red-600 font-bold">{message}</p>} />
            </div>
            <div className="sm:flex sm:justify-between">
                <div className="py-4">
                    <label htmlFor="city" className="block font-black text-gray-500">City:</label>
                    <input type="text" {...register("city", { required: "Please enter your city." })}
                        className="w-full h-10 mt-2 px-3 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" 
                    />
                    <ErrorMessage errors={errors} name="city" render={({message}) => <p className="text-red-600 font-bold">{message}</p>} />
                </div>
                <div className="py-4">
                    <label htmlFor="postcode" className="block font-black text-gray-500">ZIP / Postcode:</label>
                    <input type="text" {...register("postcode", { required: "Please enter your postcode." })}
                        className="w-full h-10 mt-2 px-3 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" 
                    />
                    <ErrorMessage errors={errors} name="postcode" render={({message}) => <p className="text-red-600 font-bold">{message}</p>} />
                </div>
            </div>
            <div className="py-4">
                <label htmlFor="country" className="block font-black text-gray-500">Country:</label>
                <Controller 
                    name="country"
                    control={control}
                    rules={{ required: "Please select your country." }}
                    render={({field}) => 
                        <div>
                            <Select {...field} options={country_list} value={country_list.find((e) => e.value === field.value)} onChange={(e: country | null) => field.onChange(e!.label)} />
                            <ErrorMessage errors={errors} name="country" render={({message}) => <p className="text-red-600 font-bold">{message}</p>} />
                        </div>
                    }
                />
            </div>
            <div className="py-4 flex justify-between">
                <Link to="/basket" className="p-2 rounded bg-gray-300 hover:bg-gray-700 hover:text-gray-300 font-bold">BASKET</Link>
                <button type="submit" className="px-4 py-2 rounded bg-green-600 hover:bg-green-800 text-white font-bold">NEXT</button>
            </div>
        </form>
    )
};

export default AddressForm;