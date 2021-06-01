export interface IPatient {
  _id: string;
  coachId: string;
  coachName: string;
  enabled: boolean;
  firstName: string;
  lastName: string;
  language: string;
  messagesSent: number;
  phoneNumber: string;
  prefTime: number;
  reports: [];
  responseCount: 0;
  __v: number;
}
