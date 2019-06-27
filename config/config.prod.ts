import { MeYupConfig } from '.';

export default (): MeYupConfig => ({
  mongoose: {
    client: {
      url: 'mongodb://dds-j6c8f48a4efeacb41.mongodb.rds.aliyuncs.com:3717,dds-j6c8f48a4efeacb42.mongodb.rds.aliyuncs.com:3717/MeYupShop?replicaSet=mgset-15481221',
      options: {
        poolSize: 20,
        // user: 'meyupsrv',
        // pass: 'meyupsrv@mongoDB',
        user: 'root',
        pass: 'meyupsrv@mongoDB',
      },
    },
  },
});
