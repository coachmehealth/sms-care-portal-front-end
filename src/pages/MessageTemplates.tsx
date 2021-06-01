import React from "react";
import MessageTemplateForm from "../components/messageTemplate/MessageTemplateForm";
import MessageTemplateTable from "../components/messageTemplate/MessageTemplateTable";
import { TableOptions } from "../components/Table";
import { Column } from "../components/TwoColTable";
import { useQuery } from "react-query";
import auth from "../api/core/auth";
import { getTemplates } from "../api/userApi";

const tableOptions: TableOptions = {
  sortOptions: [],
  sortsChoiceEnabled: false,
  defaultPerPage: 10,
};

const cols: Column[] = [
  {
    name: "Type",
    data: "type",
    key: "type",
  },
  {
    name: "Language",
    data: "language",
    key: "language",
  },
];

const MessageTemplatePage = () => {
  const templateQuery = useQuery(
    [
      "getTemplates",
      { accessToken: auth.getAccessToken() },
      localStorage.getItem("email"),
    ],
    getTemplates,
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div>
      <MessageTemplateForm />
      {templateQuery.isLoading && <div>Loading...</div>}
      {templateQuery.data && (
        <MessageTemplateTable
          title="Message Templates"
          data={templateQuery.data as any}
          columns={cols}
          options={tableOptions}
        />
      )}
    </div>
  );
};

export default MessageTemplatePage;
