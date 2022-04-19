module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3a544beb97c27eb183ce78ae404156d5'),
  },
});
