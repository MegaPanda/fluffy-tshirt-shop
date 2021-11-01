import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

const ContactForm = () => {
    interface ContactFormData {
        firstname: string,
        lastname: string,
        email: string,
        subject: string,
        message: string
    };
    const { register, formState: { errors, isSubmitSuccessful }, handleSubmit, reset } = useForm<ContactFormData>({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            subject: "",
            message: "",
        },
    });
    const onSubmit: SubmitHandler<ContactFormData> = (data) => console.log(data);
    // reset form when the submit is successful //
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <div className="bg-white p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="sm:flex sm:justify-between sm:gap-4">
                    <div className="py-4">
                        <label htmlFor="firstname" className="block text-sm font-black text-gray-500">First Name<span className="text-red-600">&nbsp;&nbsp;*</span></label>
                        <input type="text" {...register("firstname", { required: "This field is required." })}
                            className="w-full h-10 mt-1 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                        <ErrorMessage errors={errors} name="firstname" render={({message}) => <span className="text-xs text-red-600 font-bold">{message}</span>} />
                    </div>
                    <div className="py-4">
                        <label htmlFor="lastname" className="block text-sm font-black text-gray-500">Last Name<span className="text-red-600">&nbsp;&nbsp;*</span></label>
                        <input type="text" {...register("lastname", { required: "This field is required." })}
                            className="w-full h-10 mt-1 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                        <ErrorMessage errors={errors} name="lastname" render={({message}) => <span className="text-xs text-red-600 font-bold">{message}</span>} />
                    </div>
                </div>
                <div className="py-4">
                    <label htmlFor="email" className="block text-sm font-black text-gray-500">E-mail<span className="text-red-600">&nbsp;&nbsp;*</span></label>
                    <input type="email" {...register("email", { required: "This field is required." })}
                        className="w-full h-10 mt-1 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                    <ErrorMessage errors={errors} name="email" render={({message}) => <span className="text-xs text-red-600 font-bold">{message}</span>} />
                </div>
                <div className="py-4">
                    <label htmlFor="subject" className="block text-sm font-black text-gray-500">Subject of Inquiry<span className="text-red-600">&nbsp;&nbsp;*</span></label>
                    <input type="text" {...register("subject", { required: "This field is required." })}
                        className="w-full h-10 mt-1 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                    <ErrorMessage errors={errors} name="subject" render={({message}) => <span className="text-xs text-red-600 font-bold">{message}</span>} />
                </div>
                <div className="py-4">
                    <label htmlFor="message" className="block text-sm font-black text-gray-500">Message<span className="text-red-600">&nbsp;&nbsp;*</span></label>
                    <textarea rows={5} {...register("message", { required: "This field is required." })}
                        className="w-full mt-1 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                    <ErrorMessage errors={errors} name="message" render={({message}) => <span className="text-xs text-red-600 font-bold">{message}</span>} />
                </div>
                <button type="submit" className="block w-full mt-4 px-4 py-2 rounded bg-green-600 hover:bg-green-800 text-white font-bold">SUBMIT</button>
                
            </form>
        </div>
    )
};

export default ContactForm;