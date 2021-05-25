export interface IOutcome {
  alertType: string;
  date: string;
  firstName: string;
  lastName: string;
  patientID: string;
  phoneNumber: string;
  response: string;
  value: string;
}

export interface IOutcomeArray extends Array<IOutcome> {}
