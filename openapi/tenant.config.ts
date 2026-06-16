const config = {
  // input: 'http://localhost:5266/swagger/v1/swagger.json',
  input: 'http://localhost:5027/swagger/v1/swagger.json',

  output: '../src/app/core/api/tenant',

  options: {
    dateType: 'Date',

    enumStyle: 'enum',

    generateServices: true,
  },
};

export default config;
