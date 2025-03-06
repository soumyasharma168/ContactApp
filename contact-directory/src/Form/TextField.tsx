import { ErrorMessage, Field } from "formik";
import React from "react";

export default function TextField(props: TextFieldProps){
    return(
        <div className="mb-3">
            <label htmlFor={props.field} className="label-control">{props.displayName}</label>
            <Field name={props.field} id={props.field} className="form-control" placeholder={props.displayName}></Field>
            <ErrorMessage name={props.field} >{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
        </div>
    )
}

interface TextFieldProps{
    field: string;
    displayName: string;
}