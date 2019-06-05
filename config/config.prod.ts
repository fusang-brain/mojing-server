import { MeYupConfig } from '.';

export default (): MeYupConfig => ({
  mongoose: {
    client: {
      url: 'mongodb://127.0.0.1/MeYupShop',
      options: {
        poolSize: 20,
        user: 'meyupsrv',
        pass: 'meyupsrv@mongoDB',
      },
    },
  },
});
