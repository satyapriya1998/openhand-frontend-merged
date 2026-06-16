// openapi/organization.config.ts

const config = {
  input: 'http://localhost:5025/swagger/v1/swagger.json',

  output: '../src/app/core/api/organization',

  options: {
    dateType: 'Date',
    enumStyle: 'enum',
    generateServices: true,
  },
};

export default config;
