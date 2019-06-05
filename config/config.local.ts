import { MeYupConfig } from '.';

export default (): MeYupConfig => ({
  mongoose: {
    client: {
      url: 'mongodb://meyup.io/MeYupShop',
      options: {
        poolSize: 20,
        user: 'meyupsrv',
        pass: 'meyupsrv@mongoDB',
      },
    },
  },
});
