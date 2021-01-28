import { time } from 'console';
import React from 'react';
import ImageGallery from "react-image-gallery";
import "../styles/image-gallery.css"
import styled, { createGlobalStyle } from 'styled-components';
import Table, { Column, SortOption, TableOptions } from "../components/Table";
import ScheduledMessageTable from "../components/ScheduledMessageTable";
import ResultsTable from "../components/ResultsTable";
import SearchBar from "../components/SearchBar";
import { getPatientOutcomes, getPatient, getPatientMessages } from '../api/patientApi';
import { useQuery } from 'react-query';
import auth from '../api/core/auth';
import { useParams } from 'react-router-dom';
import {SMSTile, Texter} from '../components/SMSTile';

const PatientRecords: React.FC = () => {
    const onSearch = (query : string) => {
        alert(`You searched ${query}`);
    }
    const id  = useParams<{ id: string }>();
    
    const { 
        data: patient,
        isLoading: loadingPatient,
      } = useQuery(
        [id.id, { accessToken: auth.getAccessToken() }, "Patient Loading"],
        getPatient,
        {
          refetchOnWindowFocus: false,
        }
    );

    const { 
        data: outcomes,
        isLoading: loadingOutcomes,
      } = useQuery(
        [id.id, { accessToken: auth.getAccessToken() }, "Outcomes Loading"],
        getPatientOutcomes,
        {
          refetchOnWindowFocus: false,
        }
    );

    const { 
        data: messages,
        isLoading: loadingMessages,
      } = useQuery(
        [id.id, { accessToken: auth.getAccessToken() }, "Messages Loading"],
        getPatientMessages,
        {
          refetchOnWindowFocus: false,
        }
    );

    console.log(messages)

    if(!loadingMessages && messages) {
        for (const row of messages as any) {
            if (row.sender === 'PATIENT') {
                row.type = Texter.PATIENT;
            } else if (row.sender === 'COACH') {
                row.type = Texter.COACH;
            } else {
                row.type = Texter.BOT;
            }
        }
    }


    const loadHeader = (res: any) => {;
        return (
            <Title>{res.firstName} {res.lastName}'s Patient Records</Title>
        );
    };

    return (
        <DashboardContainer>
            <GlobalStyle />
            <ImageGalleryStyles></ImageGalleryStyles>
            <div className="columns">
                <div className="column">
                    {loadingPatient && <div>Loading...</div>}
                    {patient && loadHeader(patient)}
                    <Subtitle>Weekly Reports, Measurements, and SMS Chat logs</Subtitle>
                        <ImageGallery infinite = {false} items = {images} showThumbnails={false} showPlayButton={false} showFullscreenButton={false}></ImageGallery>
            
                        {loadingOutcomes && <div>Loading...</div>}
                        {outcomes && <ResultsTable options={table1Options} title="" data={outcomes as any} columns={cols}></ResultsTable>}
                        {!loadingOutcomes && !outcomes && <p>No measuremnts found.</p>}
                    </div>
                <div className="column">
                    {loadingMessages && loadingPatient && <div>Loading...</div>}
                    {messages && patient && <SMSTile messages={messages as any} patient={patient as any} > </SMSTile>}
                    
                </div>
            </div>
        </DashboardContainer>
    )
}

// options for sorting the tables on the right 
const table1Options: TableOptions = {
    sortOptions: [],
    sortsChoiceEnabled: false
}

const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

// columns for the right side of the page
const cols: Column[] = [
    {
        name: "Indicator",
        data: (row) => <React.Fragment>Blood Glucose</React.Fragment>, 
        key: "indicator"
    },
    {
        name: "Measure",
        data: "value",
        key: "value"
    },
    {
        // need to create logic for the text color, possible do it down in activetext
        name: "Analysis",
        data: (row) => classifyNumeric(row.value) == "Green" ? <ActiveTextG>{classifyNumeric(row.value)}</ActiveTextG>:
                       classifyNumeric(row.value) == "Yellow" ? <ActiveTextY>{classifyNumeric(row.value)}</ActiveTextY>:
                       classifyNumeric(row.value) == "Red" ? <ActiveTextR>{classifyNumeric(row.value)}</ActiveTextR>:
                       <ActiveTextB>{classifyNumeric(row.value)}</ActiveTextB>,
        key: "analysis"
    },
    {
        name: "Time Recorded",
        data: (row) => <React.Fragment>{new Date(row.date).toString()}</React.Fragment>,
        key: "date"
    }
]



// CSS for the page

const Title = styled.h1`
    font-family: Avenir;
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 49px;

    color: #404040;
`;

const Subtitle = styled.p`
    font-family: Avenir;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 20px;

    color: #404040;

    padding: 30px 0;
`;

const DashboardContainer = styled.div`
    padding: 20px;
`

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #E5E5E5;
        padding-top: 20px !important;
    }
`

const SearchBarContainer = styled.div`
`

const CheckBox = styled.input`
    width: 11.51px;
    height: 12px;
    left: 653.93px;
    top: 736px;

    font-family: Font Awesome 5 Free;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 11px;
    /* identical to box height */


    color: #404040;
`;


const ExportButton = styled.button`
    float: right;

    padding: 9px 20px;
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
`;

const ActiveTextG = styled.p`
    color: #B4D983;
    font-weight: 800;
`
const ActiveTextY = styled.p`
    color: #fbf36f;
    font-weight: 800;
`
const ActiveTextR = styled.p`
    color: #c92c1a;
    font-weight: 800;
`
const ActiveTextB = styled.p`
    color: #1f1e1d;
    font-weight: 800;
`

const ImageGalleryStyles = createGlobalStyle`
    .image-gallery {
        padding: 40px 100px; 
        background-color: white;
        margin-bottom: 30px;
        border-radius: 20px;
        box-shadow: 5px 5px 10px rgba(221, 225, 231, 0.5);
    }

    .image-gallery-svg {
        stroke-width: 1.5px;
    }

    .image-gallery-right-nav {
        right: -90px;
    }

    .image-gallery-left-nav {
        left: -90px;
    }

    .image-gallery-left-nav, .image-gallery-right-nav {
        filter: none;
        color: #F29DA4;

        &:hover {
            filter: drop-shadow(0 0 4px #c4c4c4);
            color: #F29DA4;
        }

        &:focus {
            filter: drop-shadow(0 0 4px #c4c4c4);
            color: #F29DA4;
            outline: none;
        }
    }
`

function classifyNumeric(input:any) {
    var number = parseInt(input);
    if (number < 70) {
        return "Too Low";
    }
    else if (70 <= number && number <= 79) {
        return "<80";
    }
    else if (80 <= number && number <= 130) {
        return "Green";
    }
    else if (131 <= number && number <= 180) {
        return "Yellow";
    }
    else if (181 <= number && number <= 300) {
        return "Red";
    }
    else {
        return ">=301";
    }
}


function outcomesToCSV(data: any) {
    const csvRows = [];
    const headers = ["Type", "Measurement", "Classification", "Date"];
    csvRows.push(headers.join(','));
    for (const row of data) {
        const values = ["Blood Glucose", row.value, classifyNumeric(row.value), new Date(row.date).toString()];
        csvRows.push(values.join(','));
    }
    return csvRows.join('\n');
};

function downloadCSV(data: string, id: string) {
    const csvObj = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(csvObj);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    const fileName = "Patient_".concat(id, "_Outcomes.csv");
    a.setAttribute('download', fileName);
    document.body.append(a);
    a.click();
    document.body.removeChild(a);
};

export default PatientRecords;