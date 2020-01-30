import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Setup({ values, errors, touched, status })
{
  const [peoples, sPeoples] = useState([]);

  useEffect(() =>
    {
        status && sPeoples(peoples => [...peoples, status]);
    }, [status]);

  return (
    <div className="onboard-form">
        <Form>
            <label htmlFor="name">
                Name
                <br />
                <Field id="name" type="text" name="name" placeholder="name" />
                {touched.name && errors.name && (<p>{errors.name}</p>)}
            </label>
            <br />
            <label htmlFor="email">
                E-Mail
                <br />
                <Field id="email" type="text" name="email" placeholder="email" />
                {touched.email && errors.email && (<p>{errors.email}</p>)}
            </label>
            <br />
            <label htmlFor="password">
                Password
                <br />
                <Field id="password" type="text" name="password" placeholder="password" />
                {touched.password && errors.password && (<p>{errors.password}</p>)}
            </label>
            <br />
            <label htmlFor="tos">
                <Field id="tos" type="checkbox" name="tos" placeholder="tos" />
                Agree to TOS
                {touched.tos && errors.tos && (<p>{errors.tos}</p>)}
            </label>
            <br />
            <button type="submit">Submit!</button>
        </Form>
        {peoples.map(people => {
            return (
            <ul key={people.name}>
                <li>Name: {people.name}</li>
                <li>Email: {people.email}</li>
                <li>Password: {people.password}</li>
            </ul>
            );
        })}
    </div>
  );
};

const FormA = withFormik(
{
    mapPropsToValues(props)
    {
        return (
            {
                name: props.name || "",
                password: props.password || "",
                email: props.email || "",
                tos: false
            }
        );
    },

    validationSchema: Yup.object().shape(
    {
        name: Yup.string().required(),
        password: Yup.string().required(),
        email: Yup.string().required(),
        tos: Yup.bool().oneOf([true], "Field must be checked")
    }),

    handleSubmit(values, { setStatus, resetForm })
    {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res =>
            {
                setStatus(res.data);
                resetForm();
            })
            .catch(err => console.log(err.response));
    }
}
)(Setup);
export default FormA;