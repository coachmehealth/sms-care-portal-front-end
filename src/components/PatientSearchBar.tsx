import React from 'react';
import styled from 'styled-components';

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    min-height: 100px;  
    margin: 12px 0px 16px 20px;
    justify-content: space-between;
    min-width: 100px;
    max-height: 42 px;
`;

const SearchBar = styled.div`
    padding: 13px;
    background: #FFFFFF;
    box-shadow: 5px 5px 10px rgba(221, 225, 231, 0.5);
    border-radius: 12px;
    backgroundColor: #F29DA4,
    borderRadius: 15px,
    fontWeight: 800;
    max-height: 42 px;
    text-align: left; 
    width: 100%;
    flex-direction: row;
`;

const Logo = styled.img`
    width: 11px;
    margin: 0px 4px;
`
const SearchLogo = require('../assets/images/searchLogo.png');

//CALL A PATIENT HERE TO INTEGRATE INTO HEADER AND SUCH
//const PATIENT= [
    //{ firstName: Kakashi,
       // lastName: Hatake,
       // coachId: xyz,
        //language: English,
       // phoneNumber: "4256989359",
       // messagesSent: ,
        //responseCount: ,
        //reports: {data: , contentType: }   
    //}
//]

interface Props {
    
}

const PatientSearchBar: React.FC<Props> = ({}) => {
  return (
    <TextContainer>
        <SearchBar>
            <Logo src = {SearchLogo} id = "login-logo"></Logo>
                 Search by patient or phone number
         </SearchBar>
    </TextContainer>
  );
};

export default PatientSearchBar;