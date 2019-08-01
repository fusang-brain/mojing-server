import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  validate: {
    enable: true,
    package: 'egg-validate',
  },

  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

  onerror: {
    enable: false,
    package: 'egg-onerror',
  },

  jwt: {
    enable: true,
    package: "egg-jwt"
  },

  session: {
    enable: true,
    package: 'egg-session',
  },

  redis: {
    enable: true,
    package: 'egg-redis',
  },
};

export default plugin;
