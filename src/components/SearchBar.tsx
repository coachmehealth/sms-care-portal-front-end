import React from 'react';
import styled from 'styled-components';
import { Field, FieldAttributes, Form, Formik } from 'formik';

interface SearchBarProps {
    onSearch: (query: string) => void
    placeholder: string
}

const SearchField = styled.div`
    width: 100%;
    text-align: center;
`

const SearchIcon = styled.span`
    position: absolute !important;
    left: 14px !important;
    top: 10px !important;
    font-size: 10px;
    color: #637792 !important;
`

const inputStyles = {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: "12px",
    padding: "8px 20px 8px 32px",
    border: "none",
    width: "100%",
    boxShadow: "5px 5px 10px 0px rgba(221, 225, 231, 0.5)"

}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
    const onSubmit = (values : any) => {
        onSearch(values.query);
    }

    return (
        <Formik initialValues={{ query: "" }} onSubmit = { onSubmit }>
            <Form>
                <SearchField>
                    <p className="control has-icons-left has-icons-right">
                        <Field
                            name="query"
                            style={inputStyles}
                            type="text"
                            placeholder={placeholder}
                            className="form-field"
                        />
                        <SearchIcon className="is-small is-left">
                            <i className="fas fa-search"></i>
                        </SearchIcon>
                    </p>
                </SearchField>
            </Form>
        </Formik>
    )
}

export default SearchBar