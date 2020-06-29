const { PORT, API_VERSION } = process.env;
let { NODE_ENV } = process.env;

NODE_ENV =
  typeof process.env.NODE_ENV !== 'undefined'
    ? process.env.NODE_ENV
    : 'development';

const APP_PORT = typeof PORT !== 'undefined' ? parseInt(PORT, 10) : 3005;
const application = {
  API_VERSION,
  APP_PORT,
  NODE_ENV
};

export default application;
