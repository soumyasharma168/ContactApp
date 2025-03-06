import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import TextField from "../Form/TextField";
import { ContactDTO } from "./contact.model";
import Button from "../utils/Button";
import axios from "axios";
import { urlContact } from "../endpoint";

export default function Contact(props: ContactProps){

    const[contact,setContact] = useState<ContactDTO | undefined>(undefined);

    const initialValues: ContactDTO = {
        id: props.model?.id || 0,
        firstName: props.model?.firstName || '',
        lastName: props.model?.lastName || '',
        email: props.model?.email || '',
        phone: props.model?.phone||'',
        address: props.model?.address|| '',
    }

    useEffect(() => {
        if(props.model && props.model.id){

            axios.get(`${urlContact}/${props.model.id}`).then((response) => setContact(response.data));
        }
    })

    return(
        <>
            <h3>Contact Form</h3>
           <Formik initialValues={initialValues}
           onSubmit={(value)=>console.log(value)}>

            <Form>
                <TextField field="firstName" displayName="First Name"></TextField>
                <TextField field="lastName" displayName="Last Name"></TextField>
                <TextField field="phone" displayName="Phone Number"/>
                <TextField field="email" displayName="Email"></TextField>
                <TextField field="address" displayName="Address"/>
                <Button type="submit" >{props.model ? 'Upadte' : 'Submit'}</Button>
            </Form>
            
           </Formik>
        </>
    )
}

interface ContactProps{
    model?: ContactDTO;
    // onSubmit: void;
}