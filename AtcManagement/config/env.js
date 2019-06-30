
const env = {
    port: process.env.PORT || 3000,
    mongoReadHost: 'mongodb://Admin:Password123@ds343217.mlab.com:43217/readatc',
    mongoWritehost: 'mongodb://Admin:Password123@ds343217.mlab.com:43217/writeatc',
};

module.exports = {env: env};