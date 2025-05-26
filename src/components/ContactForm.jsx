import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { contactService } from "../services/api";
import "../styles/ContactForm.css";
import LogoImage from '../assets/logoSM.png';

const validationSchema = Yup.object({
    nume: Yup.string()
        .min(2, "Numele trebuie să aibă cel puțin 2 caractere")
        .max(100, "Numele nu poate depăși 100 de caractere")
        .required("Numele este obligatoriu"),
    prenume: Yup.string()
        .min(2, "Prenumele trebuie să aibă cel puțin 2 caractere")
        .max(100, "Prenumele nu poate depăși 100 de caractere")
        .required("Prenumele este obligatoriu"),
    email: Yup.string()
        .min(2, "Email-ul trebuie să aibă cel puțin 2 caractere")
        .max(100, "Email-ul nu poate depăși 100 de caractere")
        .email("Email invalid")
        .required("Emailul este obligatoriu"),
    telefon: Yup.string()
        .matches(/^\+?\d{10,15}$/, "Număr de telefon invalid")
        .required("Numărul de telefon este obligatoriu"),
    website: Yup.string()
        .min(2, "Website-ul trebuie să aibă cel puțin 2 caractere")
        .max(100, "Website-ul nu poate depăși 100 de caractere")
        .required("Website-ul sau compania sunt obligatorii"),
    mesaj: Yup.string()
        .min(10, "Mesajul este prea scurt")
        .max(255, "Mesaj prea lung")
        .required("Mesajul este obligatoriu"),
});

const FloatingLabelInput = ({ label, field, meta }) => {
    const [focused, setFocused] = useState(false);
    const hasError = meta.touched && meta.error;
    const isFilled = field.value.length > 0;
    const inputId = `contact-${field.name}`;

    return (
        <div className={`input-group ${focused ? "focused" : ""} ${isFilled ? "filled" : ""} ${hasError ? "error" : ""}`}>
            <label className="input-label" htmlFor={inputId}>{label}</label>
            <input
                {...field}
                id={inputId}
                className="input-field"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                aria-label={label}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${inputId}-error` : undefined}
            />
            {hasError && (
                <div id={`${inputId}-error`} className="error-message" role="alert">
                    {meta.error}
                </div>
            )}
        </div>
    );
};

const ContactForm = () => {
    const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            setSubmitStatus({ type: null, message: '' });
            await contactService.create(values);
            setSubmitStatus({ 
                type: 'success', 
                message: 'Mesajul a fost trimis cu succes! Vă vom contacta în curând.' 
            });
            resetForm();
            setTimeout(() => {
                setSubmitStatus({ type: null, message: '' });
            }, 2000);
        } catch (error) {
            setSubmitStatus({ 
                type: 'error', 
                message: 'A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou.' 
            });
            setTimeout(() => {
                setSubmitStatus({ type: null, message: '' });
            }, 2000);
        } finally {
            setSubmitting(false);
        }
    };

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
                    }}>Î<img
                    src={LogoImage}
                    className="logo-image-sm"
                    alt="Logo RUMO Digital Path - Calea ta digitală"
                    width="auto"
                    height="70"
                    loading="lazy"
                    aria-label="Rumo Logo"
                />preună</span>
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
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="contact-form" aria-label="Formular de contact">
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
                                {({ field, meta }) => {
                                    const textareaId = 'contact-mesaj';
                                    const hasError = meta.touched && meta.error;
                                    const remainingChars = Math.max(0, 255 - (field.value?.length || 0));
                                    const isFilled = field.value.length > 0;
                                    return (
                                        <div className={`input-group ${hasError ? "error" : ""} ${isFilled ? "filled" : ""}`}>
                                            <label className="input-label" htmlFor={textareaId}>Mesaj</label>
                                            <textarea 
                                                {...field} 
                                                id={textareaId}
                                                className="textarea-field" 
                                                aria-label="Mesaj"
                                                aria-invalid={hasError}
                                                aria-describedby={hasError ? `${textareaId}-error` : undefined}
                                            />
                                            <div className="char-counter">
                                                {remainingChars} caractere rămase
                                            </div>
                                            {hasError && (
                                                <div id={`${textareaId}-error`} className="error-message" role="alert">
                                                    {meta.error}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }}
                            </Field>
                            <button 
                                type="submit" 
                                className="send-button" 
                                disabled={isSubmitting} 
                                aria-label="Trimite mesajul"
                                aria-busy={isSubmitting}
                            >
                                <span className="arrow"></span>
                            </button>
                        </div>
                        {submitStatus.type && (
                            <p 
                                role="alert"
                                aria-live="polite"
                                style={{ 
                                    color: submitStatus.type === 'success' ? 'green' : 'red',
                                    marginTop: '10px'
                                }}
                            >
                                {submitStatus.message}
                            </p>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ContactForm;
