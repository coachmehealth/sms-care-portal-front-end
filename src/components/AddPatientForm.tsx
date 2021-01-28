import React, { useState } from 'react';

import { Field, FieldAttributes, Form, Formik } from 'formik';
import secureAxios from "../api/core/apiClient";

import styled from 'styled-components';

const inputStyles = {
    backgroundColor: "rgb(221, 225, 231)",
    borderRadius: "15px",
    padding: "8px 20px 8px 32px",
    border: "none",
    width: "100%"
}

const StyledField = styled.div`
    width: 70%;
    max-width: 768px;
    text-align: center;
    margin: 20px auto
`

const Icon = styled.span`
    position: absolute;
    left: 14px;
    top: 10px;
    font-size: 10px;
    color: #637792;
`

const Button = styled.button`
    background-color: #F29DA4 !important;
    border-radius: 15px !important;
    font-weight: 800 !important;
    &:focus {
        box-shadow: none !important;
    }
`

const FormContainer = styled.div`
    box-shadow: 5px 5px 10px rgba(221,225,231,0.5);
    padding: 30px;
    background-color: white;
    text-align: center;
    max-width: 768px;
    margin: auto;
    border-radius: 20px;
`

const AddPatientHeader = styled.h1`
    font-weight: 800;
    font-size: 36px;
    color: #637792;
`

const CoachDropDown = styled.ol`
    list-style: none;
    position: absolute;
    left: 15px;
    box-shadow: 0px 10px 10px 0px rgba(221,225,231,0.5);
`

const CoachDropDownElement = styled.div`
    position: relative;
    z-index: 100;
    background-color: white;
    padding: 10px 30px;
    font-size: 14px;
    border-bottom: 1px solid rgb(221, 225, 231);
    transition: 0.2s ease;
    &:hover{
        background-color: rgb(238, 239, 242);
    }
`

const LanguageSelect = styled.select`
    margin: 10px 20px 20px 20px;
`

const EnabledInput = styled.input`
    margin: 0 10px 20px 20px;
`

const initialValues = {
    firstName: "",
    lastName: "",
    language: "",
    coachId: "",
    phoneNumber: ""
}

const FieldWrapper = ({
    children,
    icon,
}: {
    children: FieldAttributes<any>;
    icon?: string;
}) => {
    if (!icon) return children;

    return (
        <StyledField className="field">
            <div className="control has-icons-left has-icons-right">
                {children}
                <Icon className="is-small is-left">
                    <i className={`fas ${icon}`}></i>
                </Icon>
            </div>
        </StyledField>
    );
};

const AddPatientForm: React.FC = () => {

    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setError] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [language, setLanguage] = useState("English");
    const [phoneNum, setPhoneNum] = useState("");
    const [coachId, setCoachId] = useState("");
    const [isEnabled, setEnabled] = useState(true);
    const [msgTime, setTime] = useState("00:00")

    const [coachName, setCoachName] = useState("");
    const [coachDropdown, setCoachDropdown] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleSubmit = (data: any) => {
        setLoading(true);
        secureAxios.post("/api/patients/add", {
            firstName,
            lastName,
            language,
            phoneNumber: phoneNum.replace(/[^0-9\.]/g, ''),
            coachId,
            isEnabled,
            msgTime,
            coachName
        }).then((res) => {
            setMessage(`Patient ${data.firstName} ${data.lastName} added successfully`)
            setError(false);
            setLoading(false);
            document.forms[0].reset();
        }).catch((err) => {
            setMessage(err.response.data.msg)
            setLoading(false)
            setError(true);
        })
    }

    const handleCoachInput = (e: any) => {
        setCoachName(e.target.value);
        const query = e.target.value;
        secureAxios.get("/api/coaches/search", {
            params: {
                query
            }
        }).then((data) => {
            setCoachDropdown(data.data.coaches);
        });
    }

    return (
        <FormContainer>
            <AddPatientHeader>Add Patient</AddPatientHeader>
            <p>Please enter patient information below</p>
            { message != null &&
                <p style={{ color: isError ? "red" : "#637792" }}>{message}</p>
            }

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <FieldWrapper icon="fa-info">
                        <Field
                            name="firstName"
                            style={inputStyles}
                            type="text"
                            placeholder="Patient first name"
                            className="form-field"
                            onInput={(e: any) => setFirstName(e.target.value)}
                        />
                    </FieldWrapper>

                    <FieldWrapper icon="fa-info">
                        <Field
                            name="lastName"
                            style={inputStyles}
                            type="text"
                            placeholder="Patient last name"
                            className="form-field"
                            onInput={(e: any) => setLastName(e.target.value)}
                        />
                    </FieldWrapper>

                    <FieldWrapper icon="fa-user-shield">
                        <input
                            name="coach"
                            style={inputStyles}
                            type="text"
                            placeholder="Patient Coach"
                            className="form-field"
                            onInput={handleCoachInput}
                            autoComplete="none"
                            onFocus={() => setDropdownVisible(true)}
                            onBlur={() => setTimeout(()=>setDropdownVisible(false), 100)}
                            onChange={()=>{}}
                            value = {coachName}
                        />
                        {dropdownVisible && 
                            <CoachDropDown>
                                {coachDropdown.map((coach: any) => (
                                    <CoachDropDownElement key={coach._id} onClick = {() => {
                                        setCoachName(coach.name);
                                        setCoachId(coach._id);
                                        setDropdownVisible(false);
                                    }}>
                                        <p>{coach.name}</p>
                                    </CoachDropDownElement>
                                ))}
                            </CoachDropDown>
                        }

                    </FieldWrapper>

                    <FieldWrapper icon="fa-phone">
                        <Field
                            name="phoneNumber"
                            style={inputStyles}
                            type="tel"
                            placeholder="Patient Phone Number"
                            className="form-field"
                            onInput={(e: any) => setPhoneNum(e.target.value)}
                        />
                    </FieldWrapper>

                    <FieldWrapper icon="fa-clock">
                        <Field
                            name="msgTime"
                            style={inputStyles}
                            type="text"
                            placeholder="Preferred message time, 24-hour time format (ex: 13:25)"
                            className="form-field"
                            onInput={(e: any) => setTime(e.target.value)}
                        />
                    </FieldWrapper>

                    <div>
                        <label> Patient Language: 
                        <LanguageSelect id="language-select" name = "langauge" value = {language} onChange = {(e) => setLanguage(e.target.value)}>
                            <option value = "english">English</option>
                            <option value = "spansh">Spanish</option>
                        </LanguageSelect>
                        </label>
                    </div>

                    <div>
                        <label> Enabled: 
                        <EnabledInput type = "checkbox" name="enabled" checked={isEnabled} onChange={(e) => setEnabled(e.target.checked)}/>
                        </label>
                    </div>

                    <Button className={"button is-primary" + (isLoading ? " is-loading" : "")} type="submit">
                        Add Patient
                    </Button>
                </Form>

            </Formik>
        </FormContainer>
    )
}

export default AddPatientForm;