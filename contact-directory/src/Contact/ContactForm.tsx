import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import Button from "../utils/Button";
import TextField from "../Form/TextField";
import { ContactDTO } from "./contact.model";
import * as Yup from 'yup';
import axios from "axios";
import { urlContact } from "../endpoint";

export default function(props: ContactFromProps) {
  const [contact, setContact] = useState<ContactDTO | undefined>(undefined);

  useEffect(() => {
    if (props.model && props.model.id) {
      axios.get(`${urlContact}/${props.model.id}`).then((response) => {
        setContact(response.data); // Store the response data, if necessary
      });
    }
  }, [props.model]);

  const handleSubmit = async (values: ContactDTO, actions: FormikHelpers<ContactDTO>) => {
    try {
      if (values.id) {
        // Update existing contact
        await axios.put(`${urlContact}/${values.id}`, values).then(() => {
          alert("Contact updated successfully");
          props.onSubmit(values, actions); // Pass to parent component on success
        });
      } else {
        // Create new contact
        await axios.post(urlContact, values).then(() => {
          alert("Contact created successfully");
          props.onSubmit(values, actions); // Pass to parent component on success
        });
      }
    } catch (error) {
      console.error("Error in submitting form:", error);
      actions.setSubmitting(false); // Stop form submission loading state on error
    }
  };

  return (
    <Formik
      key={props.model?.id} // Force re-render when props.model changes
      initialValues={{
        id: props.model?.id || 0,
        firstName: props.model?.firstName || '',
        lastName: props.model?.lastName || '',
        email: props.model?.email || '',
        phone: props.model?.phone || '',
        address: props.model?.address || '',
      }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        phone: Yup.string().required("Phone number is required"),
        address: Yup.string().required("Address is required"),
      })}
    >
      {(formikProps) => (
        <Form className="form-control">
          <TextField field="firstName" displayName="First Name" />
          <TextField field="lastName" displayName="Last Name" />
          <TextField field="phone" displayName="Phone Number" />
          <TextField field="email" displayName="Email" />
          <TextField field="address" displayName="Address" />
          <Button
            className="btn btn-primary"
            type="submit"
            disabled={formikProps.isSubmitting}
          >
            {props.model ? 'Update' : 'Create'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

interface ContactFromProps {
  model?: ContactDTO;
  onSubmit(value: ContactDTO, action: FormikHelpers<ContactDTO>): void;
}
