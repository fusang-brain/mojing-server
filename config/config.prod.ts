
import { MeYupConfig } from '.';

export default (): MeYupConfig => ({
  // keys: appInfo.name + '_1553332432157_7228',
  
  mongoose: {
    client: {
      url: 'mongodb://dds-wz9006f21b6cb8a41690-pub.mongodb.rds.aliyuncs.com:3717,dds-wz9006f21b6cb8a42424-pub.mongodb.rds.aliyuncs.com:3717/MeYupShop?replicaSet=mgset-15727591',
      options: {
        poolSize: 20,
        user: 'root',
        pass: 'meyupsrv@mongoDB',
      },
    },

  },
});


