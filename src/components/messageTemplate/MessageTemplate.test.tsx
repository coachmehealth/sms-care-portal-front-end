import React from "react";
import { render } from "@testing-library/react";
import MessageTemplateForm from "./MessageTemplateForm";
import MessageTemplateTable from "./MessageTemplateTable";
import { TableOptions } from "../../components/Table";
import { Column } from "../../components/TwoColTable";
test("MessageTemplateForm renders without error", async () => {
  render(<MessageTemplateForm />);
});

test("MessageTemplateTable renders without error", async () => {
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

  const tableData = [
    {
      _id: "60b6a01c8af2766343d5734b",
      language: "Spanish",
      text: "I have a message with a screenshot with creator",
      type: "Yellow",
      creator: "test@coachme.net",
      media: "uploads/c132874d-2743-45a9-b895-75cd177df7f7.png",
      __v: 0,
    },
  ];

  render(
    <MessageTemplateTable
      title="Message Templates"
      data={tableData}
      columns={cols}
      options={tableOptions}
    />
  );
});
