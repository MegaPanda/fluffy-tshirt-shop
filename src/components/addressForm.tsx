import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useExternalScript } from '../custom-hooks/useExternalScript';
import { UserCheckoutForm } from '../reducers/checkoutSlice';
import EmptyBasketState from './emptyBasketState';

const AddressForm = ({
        total_quantity,
        nextStep
    }: {
        total_quantity: number,
        nextStep: (data: UserCheckoutForm, page: string) => void
    }) => {
    
    const { register, formState: { errors }, setValue, handleSubmit } = useFormContext();

    /* Google places autocompete API  */
    let externalScript = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCxnZ9Ie-zckirXiWKFVSzctS98afC_K9U&libraries=places";
    useExternalScript(externalScript, "googleAutocomplete", initAutocomplete);
    let autocomplete: google.maps.places.Autocomplete;
    let addressField: HTMLInputElement;

    function initAutocomplete() {
        addressField = document.querySelector("#shipAddress") as HTMLInputElement;
        autocomplete = new google.maps.places.Autocomplete(addressField, {
            componentRestrictions: { country: ["si", "tw"] },
            fields: ["address_components"],
            types: ["address"],
        });

        autocomplete.addListener("place_changed", fillInAddress);
    };

    function fillInAddress() {
        const place = autocomplete.getPlace();
        console.log(place);
        let address1 = "";

        for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
            const componentType = component.types[0];

            switch (componentType) {
                case "street_number": {
                    address1 += component.long_name;
                    break;
                }
                case "route": {
                    address1 = `${component.short_name} ${address1}`;
                    setValue("shipAddress", address1, { shouldValidate: true });
                    break;
                }
                case "administrative_area_level_1": {
                    setValue("city", component.short_name, { shouldValidate: true });
                    break;
                }
                case "postal_code": {
                    setValue("postcode", component.long_name, { shouldValidate: true });
                    break;
                }
                case "country": {
                    setValue("country", component.long_name, { shouldValidate: true });  
                    break;
                }
            }
        }
    };
    // prevent user from filling the checkout form if the basket is empty //
    if (total_quantity === 0) {
        return (
            <EmptyBasketState />
        )
    } else {
        return (
            <div className="bg-white p-4">
                <h1 className="text-2xl font-black mb-4">Shipping Address</h1>
                <form onSubmit={handleSubmit((data: UserCheckoutForm) => nextStep(data, "payment"))}>
                    <div className="sm:flex sm:justify-between sm:gap-4">
                        <div className="py-4">
                            <label htmlFor="firstname" className="block text-sm font-black text-gray-500">First Name</label>
                            <input type="text" {...register("firstname", { required: "Your first name is required." })}
                                className="w-full h-10 mt-1 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" 
                            />
                            <ErrorMessage errors={errors} name="firstname" render={({message}) => <p className="text-xs text-red-600 font-bold">{message}</p>} />
                        </div>
                        <div className="py-4">
                            <label htmlFor="lastname" className="block text-sm font-black text-gray-500">Last Name</label>
                            <input type="text" {...register("lastname", { required: "Your last name is required." })}
                                className="w-full h-10 mt-1 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" 
                            />
                            <ErrorMessage errors={errors} name="lastname" render={({message}) => <p className="text-xs text-red-600 font-bold">{message}</p>} />
                        </div>
                    </div>
                    <div className="py-4">
                        <label htmlFor="shipAddress" className="block text-sm font-black text-gray-500">Address</label>  
                        <input type="text" id="shipAddress" {...register("shipAddress", { required: "Please enter your address." })}
                            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.key === 'Enter' && e.preventDefault() }}
                            className="w-full h-10 mt-1 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" 
                        />
                        <ErrorMessage errors={errors} name="shipAddress" render={({message}) => <p className="text-xs text-red-600 font-bold">{message}</p>} />
                    </div>
                    <div className="sm:flex sm:justify-between sm:gap-4">
                        <div className="py-4">
                            <label htmlFor="city" className="block text-sm font-black text-gray-500">City</label>
                            <input type="text" {...register("city", { required: "Please enter your city." })}
                                className="w-full h-10 mt-1 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" 
                            />
                            <ErrorMessage errors={errors} name="city" render={({message}) => <p className="text-xs text-red-600 font-bold">{message}</p>} />
                        </div>
                        <div className="py-4">
                            <label htmlFor="postcode" className="block text-sm font-black text-gray-500">ZIP / Postcode</label>
                            <input type="text" {...register("postcode", { required: "Please enter your postcode." })}
                                className="w-full h-10 mt-1 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" 
                            />
                            <ErrorMessage errors={errors} name="postcode" render={({message}) => <p className="text-xs text-red-600 font-bold">{message}</p>} />
                        </div>
                    </div>
                    <div className="py-4">
                        <label htmlFor="country" className="block mb-2 text-sm font-black text-gray-500">Country</label>
                        <input type="text" {...register("country", { required: "Please enter your country." })}
                            className="w-full h-10 mt-1 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                        <ErrorMessage errors={errors} name="country" render={({message}) => <p className="text-xs text-red-600 font-bold">{message}</p>} />
                    </div>
                    <button type="submit" className="block w-full mt-4 px-4 py-2 rounded bg-green-600 hover:bg-green-800 text-white font-bold">PAYMENT METHOD</button>
                </form>
            </div>
        )
    }
};

export default AddressForm;