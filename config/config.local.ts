import { MeYupConfig } from '.';

export default (): MeYupConfig => ({
  mongoose: {
    client: {
      url: 'mongodb://localhost/MeYupShop',
      options: {
        poolSize: 20,
        // user: 'meyupsrv',
        // pass: 'meyupsrv@mongoDB',
      },
    },
  },
});
