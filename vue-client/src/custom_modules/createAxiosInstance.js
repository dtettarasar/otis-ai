import axios from 'axios';
// import Cookies from 'js-cookie';

// Fonction utilitaire pour créer une instance Axios avec les headers d'authentification
export const createAxiosInstance = (accessToken) => {
  return axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

// Instance Axios avec les headers d'authentification
export const axiosInstance = (accessToken) => createAxiosInstance(accessToken);