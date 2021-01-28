import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MessageTemplateForm from '../components/MessageTemplateForm';
import MessageTemplateTable from '../components/MessageTemplateTable';
import { TableOptions } from '../components/Table';
import { Column } from '../components/TwoColTable';
import { useQuery } from 'react-query';
import auth from '../api/core/auth';
import { getTemplates } from '../api/userApi';



const FlexContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  margin: 5%;
`;

const MessageTemplatePage = () => {
  let history = useHistory();

  const templateQuery = useQuery(
        ['getTemplates', { accessToken: auth.getAccessToken() }],
        getTemplates,
        {
            refetchOnWindowFocus: false,
        }
    );


  return (
      <div><MessageTemplateForm />
      {templateQuery.isLoading && <div>Loading...</div>}
      {templateQuery.data &&  <MessageTemplateTable title= "Message Templates"
                          data  = {templateQuery.data as any}
                          columns = {cols}
                          options = {tableOptions} />}
    </div>
  );
};

const cols: Column[] = [
    {
        name: "Type",
        data: "type",
        key: "type"
    },
    {
        name: "Language",
        data: "language",
        key: "language"
    }
]

const tableOptions: TableOptions = {
    sortOptions: [],
    sortsChoiceEnabled: false,
    defaultPerPage: 10,
}

export default MessageTemplatePage;
