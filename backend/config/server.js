module.exports = ({ env }) => ({
  host: env('HOST', 'ds.rudin.ru'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
