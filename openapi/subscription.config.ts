const config = {
  input: 'http://localhost:5026/swagger/v1/swagger.json',

  output: '../src/app/core/api/subscription',

  options: {
    dateType: 'Date',

    enumStyle: 'enum',

    generateServices: true,
  },
};

export default config;
