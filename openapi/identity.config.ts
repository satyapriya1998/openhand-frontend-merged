const config = {
  // input: 'http://localhost:5185/swagger/v1/swagger.json',
  input: 'http://localhost:5023/swagger/v1/swagger.json',

  output: '../src/app/core/api/identity',

  options: {
    dateType: 'Date',

    enumStyle: 'enum',

    generateServices: true,
  },
};

export default config;
