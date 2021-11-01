import React, { useEffect } from "react";
import ContactForm from "../components/contactForm";

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <div className="pt-16 w-full pb-10">
            <div style={{zIndex: -1}} className="absolute w-full h-48 flex flex-col justify-center text-center bg-gradient-to-r from-red-300 to-pink-300">
                <h1 className="text-xl font-black text-gray-700">How can we help you?</h1>
                <p className="text-xs text-gray-700">Fill in the form and get in touch!</p>
            </div>
            <div className="pt-40 px-4 m-auto w-full max-w-lg">
                <ContactForm />
            </div>
        </div>
    )
};

export default Contact;