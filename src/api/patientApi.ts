import secureAxios from './core/apiClient';

const getPatientOutcomes = (patientID: string, { accessToken }: { accessToken: string }) => {
    return new Promise((resolve, reject) => {
      secureAxios({
        url: '/api/patients/getPatientOutcomes/' + patientID,
        method: 'GET',
        timeout: 0,
        headers: {
           Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
            resolve(res.data);
        })
        .catch((err: Error) => reject(err));
    });
  };

const getPatient = (patientID: string, { accessToken }: { accessToken: string }) => {
    return new Promise((resolve, reject) => {
      secureAxios({
        url: '/api/patients/getPatient/' + patientID,
        method: 'GET',
        timeout: 0,
        headers: {
           Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err: Error) => reject(err));
    });
  };

const getPatientMessages = (patientID: string, { accessToken }: { accessToken: string }) => {
    return new Promise((resolve, reject) => {
      secureAxios({
        url: '/api/patients/getPatientMessages/' + patientID,
        method: 'GET',
        timeout: 0,
        headers: {
           Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
            resolve(res.data);
        })
        .catch((err: Error) => reject(err));
    });
  };

export { getPatientOutcomes, getPatient, getPatientMessages }; 