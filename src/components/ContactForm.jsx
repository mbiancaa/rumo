import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import "../styles/ContactForm.css";

const validationSchema = Yup.object({
    nume: Yup.string().required("Numele este obligatoriu"),
    prenume: Yup.string().required("Prenumele este obligatoriu"),
    email: Yup.string().email("Email invalid").required("Emailul este obligatoriu"),
    telefon: Yup.string()
        .matches(/^\+?\d{10,15}$/, "Număr de telefon invalid")
        .required("Numărul de telefon este obligatoriu"),
    website: Yup.string().url("URL invalid").required("Website-ul sau compania sunt obligatorii"),
    mesaj: Yup.string().required("Mesajul este obligatoriu"),
});

const FloatingLabelInput = ({ label, field, meta }) => {
    const [focused, setFocused] = useState(false);
    const hasError = meta.touched && meta.error;
    const isFilled = field.value.length > 0;

    return (
        <div className={`input-group ${focused ? "focused" : ""} ${isFilled ? "filled" : ""} ${hasError ? "error" : ""}`}>
            <label className="input-label">{label}</label>
            <input
                {...field}
                className="input-field"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
        </div>
    );
};

const ContactForm = () => {
    return (
        <div className="contact-container">
            <div className="contact-info">
                <h3>
                    <span className="circleBefore" style={{
                        fontWeight: 600,
                        marginLeft: 10
                    }}>Găsim</span>
                    <span style={{
                        marginLeft: 80,
                        display: 'block',
                        fontWeight: 800
                    }}>Împreună</span>
                    <span style={{
                        marginLeft: 150,
                        fontWeight: 700
                    }}>Soluția <span className="circle"></span></span>
                </h3>
            </div>
            <Formik
                initialValues={{
                    nume: "",
                    prenume: "",
                    email: "",
                    telefon: "",
                    website: "",
                    mesaj: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    console.log("Formular trimis:", values);
                    resetForm();
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="contact-form">
                        <div className="form-row">
                            <Field name="nume">
                                {({ field, meta }) => <FloatingLabelInput label="Nume" field={field} meta={meta} />}
                            </Field>
                            <Field name="prenume">
                                {({ field, meta }) => <FloatingLabelInput label="Prenume" field={field} meta={meta} />}
                            </Field>
                        </div>
                        <div className="form-row">
                            <Field name="email">
                                {({ field, meta }) => <FloatingLabelInput label="Email" field={field} meta={meta} />}
                            </Field>
                            <Field name="telefon">
                                {({ field, meta }) => <FloatingLabelInput label="Număr de telefon" field={field} meta={meta} />}
                            </Field>
                        </div>
                        <Field name="website">
                            {({ field, meta }) => <FloatingLabelInput label="Website/Companie" field={field} meta={meta} />}
                        </Field>
                        <div className="d-flex">
                            <Field name="mesaj">
                                {({ field, meta }) => (
                                    <div className={`input-group ${meta.touched && meta.error ? "error" : ""}`}>
                                        <label className="input-label">Mesaj</label>
                                        <textarea {...field} className="textarea-field"></textarea>
                                    </div>
                                )}
                            </Field>
                            <button type="submit" className="send-button" disabled={isSubmitting}>
                                <span className="arrow"></span>
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ContactForm;
