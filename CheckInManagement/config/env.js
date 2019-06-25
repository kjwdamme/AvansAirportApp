const env = {
    port: process.env.PORT || 3000,
    mongoReadHost: 'mongodb://localhost/checkin',
    mongoWritehost: 'mongodb://localhost/checkin',
};

module.exports = {env: env};