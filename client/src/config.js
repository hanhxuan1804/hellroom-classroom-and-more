
const API_URL = process.env.REACT_APP_NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

export { API_URL, GOOGLE_CLIENT_ID };