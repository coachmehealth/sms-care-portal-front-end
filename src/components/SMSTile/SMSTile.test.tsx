import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { TextBubble, Texter, SMSTile } from "./SMSTile";
import { IPatient } from "pages/PatientRecords/IPatientRecords";

describe("SMSTile.txt tests", () => {
  it("renders appropiate TextBubble when the patient sends a message to the Glucose tracking number", () => {
    const { queryByTestId } = render(
      <TextBubble
        message="I am a patient answering to glucose"
        type={Texter.PATIENT}
        receivingNumber="Glucose"
      />
    );
    expect(queryByTestId("TextBubblePatientGlucose")).toBeTruthy();
    expect(queryByTestId("TextBubblePatientGlucose")).toHaveStyle(
      "background: #bfb5ff"
    );
  });

  it("renders appropiate TextBubble when the patient sends a message to the General number", () => {
    const { queryByTestId } = render(
      <TextBubble
        message="I am a patient answering to a coach"
        type={Texter.PATIENT}
        receivingNumber="General"
      />
    );
    expect(queryByTestId("TextBubblePatientGeneral")).toBeTruthy();
    expect(queryByTestId("TextBubblePatientGeneral")).toHaveStyle(
      "background: #d3d3d3"
    );
  });

  it("renders appropiate TextBubble when the coach sends a message with the General number", () => {
    const { queryByTestId } = render(
      <TextBubble
        message="I am a coach messaging a patient"
        type={Texter.COACH}
        receivingNumber="does not matter because our type is not PATIENT"
      />
    );
    expect(queryByTestId("TextBubbleCoach")).toBeTruthy();
    expect(queryByTestId("TextBubbleCoach")).toHaveStyle("background: #637792");
  });

  it("renders appropiate TextBubble when the BOT sends a message with the any number", () => {
    const { queryByTestId } = render(
      <TextBubble
        message="I am a coach messaging a patient"
        type={Texter.BOT}
        receivingNumber="does not matter because our type is not PATIENT"
      />
    );
    expect(queryByTestId("TextBubbleBot")).toBeTruthy();
    expect(queryByTestId("TextBubbleBot")).toHaveStyle("background: #a6cee3");
  });

  it("SendInput input value respects newlines", () => {
    const { queryByTestId } = render(
      <SMSTile
        messages={[] as any}
        patient={{ phoneNumber: "1234567" } as IPatient}
      />
    );
    const inputText = `I have 
    a nice dog`;
    const sendInput = queryByTestId("SendInput") as HTMLInputElement;
    if (sendInput) {
      fireEvent.change(sendInput, {
        target: {
          value: inputText,
        },
      });
      expect(sendInput?.value).toBe(inputText);
    } else {
      expect(true).toBeFalsy();
    }
  });
});
