import { MeYupConfig } from '.';

export default (): MeYupConfig => ({
  mongoose: {
    client: {
      url: 'mongodb://meyup.io/MeYupTest',
      options: {
        poolSize: 20,
        user: 'meyupsrv',
        pass: 'meyupsrv@mongoDB',
      },
    },
  },
});
