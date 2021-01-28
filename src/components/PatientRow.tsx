import React from 'react';
import styled from 'styled-components';

const MessageButton = styled.button`
    width: 104px;
    height: 32px;
    left: 820px;
    top: -1px;
    background: #FAD246;
    border-radius: 15px;    
`;

const ViewButton = styled.button`
    width: 64px;
    height: 32px;
    left: 947px;
    top: -1px;
    background: #F29DA4;
    border-radius: 15px;
`;

const RegularText = styled.span`
    font-family: Avenir;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 20px;
    color: #404040;
`;

const Status = styled.span`
    font-family: Avenir;
    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    line-height: 20px;
    color: #B4D983;
`;

const PatientName = styled.span`
    font-family: Avenir;
    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    line-height: 20px;
    color: #404040;
`;


const SentMessage = styled.span`
    font-family: Avenir, Arial, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: #000000;
`;

const FullRow = styled.p`
    align-self: flex-start;
`;


interface Props {
    
}

const PatientRow: React.FC<Props> = ({}) => {
  return (
    <FullRow>
        <Status>
            Active
        </Status>
        <PatientName>
            Grace Fujinaga
        </PatientName>
        <RegularText> 4256898110</RegularText>
        <RegularText> 3
        </RegularText>
        <RegularText> Ben Demers
        </RegularText>
        <RegularText> Response Rate
        </RegularText>
        <MessageButton> 10 Unread</MessageButton>
        <ViewButton> View </ViewButton>
    </FullRow>
  );
};

export default PatientRow;