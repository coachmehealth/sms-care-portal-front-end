import React from "react";
import OutreachAlert from "./OutreachAlert";
import { render } from "@testing-library/react";

describe("Outreach alert returns the proper icon", () => {
  test("Outreach alert returns the checkmark icon", () => {
    const { queryByTestId } = render(
      <OutreachAlert
        _id="kajsdhui2diu2hi21di21"
        outreachYesStatus={true}
        pending={false}
      />
    );
    expect(queryByTestId("return-div-checkmark")).toBeTruthy();
  });

  test("Outreach alert returns the sleep icon", () => {
    const { queryByTestId } = render(
      <OutreachAlert
        _id="kajsdhui2diu2hi21di21"
        outreachYesStatus={false}
        pending={true}
      />
    );
    expect(queryByTestId("return-div-sleep")).toBeTruthy();
  });

  test("Outreach alert returns the exclamation icon", () => {
    const { queryByTestId } = render(
      <OutreachAlert
        _id="kajsdhui2diu2hi21di21"
        outreachYesStatus={true}
        pending={true}
      />
    );
    expect(queryByTestId("return-div-exclamation")).toBeTruthy();
  });
});
