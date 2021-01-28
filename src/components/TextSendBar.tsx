import React from 'react';
import styled from 'styled-components';
import { Field, Form, Formik } from 'formik';

interface SendBarProps {
    onSend: (query: string) => void
    placeholder: string
}

const TextSendField = styled.div`
    width: 80%;
    text-align: center;
    float: left;
    padding: 14px 30px;
`

const inputStyles = {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: "12px",
    padding: "8px 20px 8px 32px",
    border: "none",
    width: "100%",
    boxShadow: "5px 5px 10px 0px rgba(221, 225, 231, 0.5)"

}
const SendButton = styled.button`
    float: right;
    width:15%;
    margin-top: 1%;
    margin-right: 10px;
    padding: 10px 25px;
    background-color: #F29DA4 !important;
    font-size: 13px !important;
    border-radius: 15px !important;
    color: white !important;
    border: none !important;
    font-weight: 600;

    &:hover {
        box-shadow: 5px 5px 10px rgba(221, 225, 231, 1) !important;
        border: none !important;
        cursor: pointer;
    }

    &:focus {
        box-shadow: 5px 5px 10px rgba(221, 225, 231, 1) !important;
        border: none !important;
    }
`

const TextSendBar: React.FC<SendBarProps> = ({ onSend, placeholder }) => {
    const onSubmit = (values : any) => {
        onSend(values.query);
    }

    return (
        <Formik initialValues={{ query: "" }} onSubmit = { onSubmit }>
            <Form>
                <TextSendField>
                        <Field
                            name="query"
                            style={inputStyles}
                            type="text"
                            placeholder={placeholder}
                            className="form-field"
                        />
                    
                </TextSendField>
                <SendButton type="submit"> Send </SendButton>
            </Form>
        </Formik>
    )
}

export default TextSendBar;