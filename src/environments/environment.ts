export const environment = {
  production: false,

  api: {
    gateway: 'http://192.168.10.110:5022',
    //  gateway: 'http://localhost:5022',

    services: {
      identity: '/identity',
      tenant: '/tenants',
      subscription: '/subscription',
      department: '/organization',
    },
  },
};
