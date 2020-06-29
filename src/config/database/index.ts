const {
  TYPEORM_HOST,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_PORT
} = process.env;

const database = {
  host: TYPEORM_HOST,
  port: typeof TYPEORM_PORT !== 'undefined' ? parseInt(TYPEORM_PORT, 10) : 5433,
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE
};

export default database;
