import React, {useState, useRef} from 'react';

import { Field, FieldAttributes, Form, Formik } from 'formik';
import secureAxios from "../api/core/apiClient";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';


import styled from 'styled-components';

const inputStyles = {
    backgroundColor: "rgb(221, 225, 231)",
    borderRadius: "15px",
    padding: "8px 20px 8px 32px",
    border: "none",
    width: "75%"
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
    margin: 10px;
`
const initialValues = {
    messageTxt: "",
    language: "Spanish",
    type: "Initial",
}

const ColoredLine = (
    <hr  style={{
        color: '#637792',
        backgroundColor: '#000000',
        height: .5,
        borderColor : '#000000'
    }}/>
);


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
        <p className="control has-icons-left has-icons-right">
          {children}
          <Icon className="is-small is-left">
            <i className={`fas ${icon}`}></i>
          </Icon>
        </p>
      </StyledField>
    );
  };

  const FieldWrapperSelect = ({
    children,
  }: {
    children: FieldAttributes<any>;
  }) => {
    return (
      <StyledField className="field">
          <p className="control">
              {children}
          </p>
      </StyledField>
    );
};

const MessageTemplateForm : React.FC = () => {
    
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setError] = useState(false);
    
    const ref =  useRef<HTMLDivElement>(null);
    const [text, setText] = useState('');
    const [showEmoji, setEmoji] = useState(false);

    const showEmojis = (e: any) => {
        setEmoji(true);
        document.addEventListener("click", closeMenu);
    };

    const closeMenu = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setEmoji(false);
            document.removeEventListener("click", closeMenu);
        } 
    };
    
    const handleSubmit = (data : any) => {        
        setLoading(true);
        data.messageTxt = text;
        secureAxios.post("/api/messageTemplate/newTemplate", data).then( (res) => {
            setMessage(`Message template added successfully`);
            setError(false);
            setLoading(false);
            window.location.reload();
            
        }).catch( (err) => {
            setMessage(err.response.data);
            setLoading(false)
            setError(true);
        })
    }
    
    const addEmoji = (e: any) => {
        let emoji = e.native;
        setText(text + emoji);
    }
    
    const textChange = (e: any) => {
        setText(e.target.value);
    }

    return (
        <div style = {{ padding: 30, backgroundColor: "white", textAlign: "center", maxWidth: 768, margin: "auto"}}>
            <h1 style = {{ fontWeight: 800, fontSize: 36, color: "#637792" }}>Add Message Template</h1>
            <h3>Please enter the message information below: </h3>
            { message != null && 
                <p style = {{color: isError ? "red" : "#637792"}}>{ message }</p>
            }
          

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <FieldWrapperSelect>
                        <label>Select language: </label> 
                        <Field as="select" name="language">
                            <option value="Spanish">Spanish</option>
                            <option value="English">English</option>
                        </Field>
                    </FieldWrapperSelect>

                    <FieldWrapperSelect>
                        <label>Select message type: </label>
                        <Field as="select" name="type">
                            <option value="Initial">Initial</option>
                            <option value="Green">Green</option>
                            <option value="Yellow">Yellow</option>
                            <option value="Red">Red</option>
                         </Field>
                    </FieldWrapperSelect>

                    <FieldWrapper>
                    
                        <Field 
                        name="messageTxt"
                        style = {inputStyles}
                        type="text"
                        placeholder="Message text"
                        className = "form-field"
                        value = {text}
                        onChange = {textChange}
                        />
                        {showEmoji && <div ref = {ref} style={{width: "355px", margin: "auto"}} ><Picker
                                        onSelect={addEmoji}
                                        title="Emoji Selector"
                                        /></div>}
                        {!showEmoji && <a onClick={showEmojis}>
                        {String.fromCodePoint(0x1f60a)}
                            </a>}
                    </FieldWrapper>

                    <Button className={"button is-primary" + (isLoading ? " is-loading" : "")} type="submit">
                        Add Message
                    </Button>
                    </Form>
                    
                </Formik>

                <span>
                    
                    </span>

        </div>
    )
}

export default MessageTemplateForm;