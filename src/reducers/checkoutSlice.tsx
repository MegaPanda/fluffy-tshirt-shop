import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserCheckoutForm {
    firstname: string,
    lastname: string,
    shipAddress: string,
    city: string,
    postcode: string,
    country: string,
    cardNumber: string,
    cardHolder: string,
    validThru: string,
    CVC: string,
};

const initialState = {
    customer: {
        fistname: '',
        lastname: '',
    },
    shipping: {
        shipAddress: '',
        city: '',
        postcode: '',
        country: '',
    },
    payment: {
        cardNumber: '',
        cardHolder: '',
        validThru: '',
        CVC: '',
    },
};

export const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        updateData: (state, action: PayloadAction<UserCheckoutForm>) => {
            state.customer.fistname = action.payload.firstname;
            state.customer.lastname = action.payload.lastname;
            state.shipping.shipAddress = action.payload.shipAddress;
            state.shipping.city = action.payload.city;
            state.shipping.postcode = action.payload.postcode;
            state.shipping.country = action.payload.country;
            state.payment.cardNumber = action.payload.cardNumber;
            state.payment.cardHolder = action.payload.cardHolder;
            state.payment.validThru = action.payload.validThru;
            state.payment.CVC = action.payload.CVC;
        },
    },
});

export const { updateData } = checkoutSlice.actions; 

export default checkoutSlice.reducer;