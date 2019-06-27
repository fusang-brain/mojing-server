import { MeYupConfig } from '.';

export default (): MeYupConfig => ({
  mongoose: {
    client: {
      url: 'mongodb://dds-j6c8f48a4efeacb41300-pub.mongodb.rds.aliyuncs.com:3717,dds-j6c8f48a4efeacb42105-pub.mongodb.rds.aliyuncs.com:3717/MeYupTest?replicaSet=mgset-15481221',
      options: {
        poolSize: 20,
        // user: 'meyupsrv',
        user: 'root',
        pass: 'meyupsrv@mongoDB',
      },
    },
  },
});
