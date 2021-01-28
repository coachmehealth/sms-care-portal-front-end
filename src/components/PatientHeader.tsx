import React from 'react';
import styled from 'styled-components';
import PatientSearchBar from '../components/PatientSearchBar';


const LogoColumn = styled.div`
    background-color: #EEF0F3;
    height: 10000vh;
`;

const TextContainer = styled.div`
    flex-direction: row;    
    display: flex;
    flex-direction: row;
    border-radius: 16px;
    min-height: 100px;   
    margin: 20px 0px 20x 61px;
    padding: 0px 20px;
`;

const PHeader= styled.h1`
    position: relative;
    font-family: Avenir;
    text-align: left;
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 49px;
    color: #404040; 
    margin: 12px 52px 12px 76px;
`;


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

const PatientHeader: React.FC<Props> = ({}) => {
  return (
      
      <LogoColumn>
        <TextContainer>
        <PHeader>
          Ben's Patient Dashboard
       </PHeader>
       <PatientSearchBar>
      </PatientSearchBar>
      </TextContainer>
    </LogoColumn>
    
  );
};

export default PatientHeader;