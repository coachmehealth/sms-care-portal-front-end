import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import secureAxios from '../api/core/apiClient';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  max-width: 200px;
  width: 100%;
  margin-left: 2.5rem;
  margin-top: 4%;
`;

const SidebarOption = styled.div`
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  width: 90%;
  margin: 0 auto 20px 0;
  text-align: center;
  background-color: rgba(72, 72, 72, 0.05);
  padding: 10px;
  border-radius: 10px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 10px;
    opacity: 0.9;
    background-color: rgba(44, 62, 80, 0.1);
  }
  &:active {
    opacity: 0.6;
  }
`;

const SidebarLabel = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: black;
`;

interface Props {}

interface SidebarOptions {
  title: string;
  path?: string;
  icon?: string;
}

const options: SidebarOptions[] = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: 'fas fa-home',
  },
  {
    title: 'New Coach',
    path: '/signup',
    icon: 'fas fa-user',
  }
];

const getCSV = () => {
  secureAxios.get("/api/messages/allOutcomes").then((res: any) => {
    const merged = [];
    for (var i = 0; i < res.data.outcomes.length; i++) {
      for (var j = 0; j < res.data.patients.length; j++) {
        if (res.data.outcomes[i].patientID.toString() == res.data.patients[j]._id.toString()) {
          res.data.outcomes[i].firstName = res.data.patients[j].firstName;
          res.data.outcomes[i].lastName = res.data.patients[j].lastName;
          merged.push(res.data.outcomes[i]);
        }
      }

    }
    const data = outcomesToCSV(merged);
    downloadCSV(data);
  }).catch((err) => {
    alert(err);
  })
}

function downloadCSV(data: any) {
  const csvObj = new Blob([data], { type: 'text/csv' });
  const url = window.URL.createObjectURL(csvObj);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  const fileName = "Patient_Outcomes.csv";
  a.setAttribute('download', fileName);
  document.body.append(a);
  a.click();
  document.body.removeChild(a);
};

function outcomesToCSV(data: any) {
  const csvRows = [];
  const headers = ["First Name", "Last Name", "ID", "Phone Number", "Date", "Response", "Value", "Classification"];
  csvRows.push(headers.join(','));
  for (const row of data) {
      const values = [row.firstName, row.lastName, 
                      row.patientID, row.phoneNumber, 
                      new Date(row.date).toString(), 
                      row.response, row.value, row.alertType ];
      csvRows.push(values.join(','));
  }
  return csvRows.join('\n');
};

const Sidebar: React.FC<Props> = (props) => {
  return (
    <SidebarContainer>
      {options.map((option) => {
        return (
          <Link
            to={option.path || '/'}
            key={option.title + option.path}
            style={{ color: 'gray' }}
          >
            <SidebarOption>
              <SidebarLabel>
                {' '}
                <i
                  className={option.icon}
                  style={{ marginRight: '5px' }}
                ></i>{' '}
                {option.title}
              </SidebarLabel>
            </SidebarOption>
          </Link>
        );
      })}
       <SidebarOption onClick= {getCSV}>
              <SidebarLabel>
                {' '}
                <i
                  className={'fas fa-download icon'}
                  style={{ marginRight: '5px',
                          color: 'black'}}
                ></i>{' '}
                {'Download All Outcomes'}
              </SidebarLabel>
            </SidebarOption>
    </SidebarContainer>
  );
};

export default Sidebar;
