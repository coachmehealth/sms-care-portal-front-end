import secureAxios from './core/apiClient';

const signup = ({ firstName, lastName, email, password }: IUserSignup) => {
  return new Promise<void>((resolve, reject) => {
    secureAxios({
      url: '/api/coaches/signup',
      method: 'POST',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    })
      .then(() => resolve())
      .catch((err: Error) => reject(err));
  });
};

const login = ({ email, password }: IUserLogin) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/coaches/login',
      method: 'POST',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: Error) => reject(err));
  });
};

const fetchMe = (key: string, { accessToken }: { accessToken: string }) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/coaches/me',
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

const getPatients = (key: string, { accessToken }: { accessToken: string }) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/coaches/getPatients',
      method: 'GET',
      timeout: 0,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        for(var i = 0; i < res.data.length; i++) {
          res.data[i].phoneNumber = res.data[i].phoneNumber.replace(/[^0-9\.]/g, '');
          if (res.data[i].enabled) {
            res.data[i].status = "Enabled";
          } else {
            res.data[i].status = "Disabled";
          }
          res.data[i].week = Math.floor(res.data[i].messagesSent/7);
          if (parseInt(res.data[i].responseCount) === 0 || parseInt(res.data[i].messagesSent) === 0){
            res.data[i].responseRate = 0;
          } else {
          var respRate = (parseInt(res.data[i].responseCount)) / parseInt((res.data[i].messagesSent));
          res.data[i].responseRate = Math.round(100 * respRate);
          }
          
        }
        resolve(res.data);
      })
      .catch((err: Error) => reject(err));
  });
};

const getTemplates = (key: string, { accessToken }: { accessToken: string }) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/messageTemplate/templates',
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

export { signup, login, fetchMe, getPatients, getTemplates };
