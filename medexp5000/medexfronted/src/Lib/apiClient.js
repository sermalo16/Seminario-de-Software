import axios from 'axios';

export const publicAxios = axios.create();
export const privateAxios = axios.create();

publicAxios.defaults.headers.common['apitoken'] = process.env.REACT_API_TOKEN;
privateAxios.defaults.headers.common['apitoken'] = process.env.REACT_API_TOKEN;

publicAxios.defaults.baseURL = process.env.REACT_APIURL;
privateAxios.defaults.baseURL = process.env.REACT_APIURL;

publicAxios.defaults.headers.common['cache-control'] = 'no-cache';
privateAxios.defaults.headers.common['cache-control'] = 'no-cache';

publicAxios.defaults.headers.common['Content-Type']='application/json';
privateAxios.defaults.headers.common['Content-Type']='application/json';

export const setJWT = (jwt) =>{
    privateAxios.defaults.headers.common['Authoriation'] = `Bearer ${jwt}`;
}
