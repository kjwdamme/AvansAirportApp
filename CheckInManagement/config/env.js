const env = {
    port: process.env.PORT || 3030,
    mongoReadHost: 'mongodb://admin:admin123@ds343217.mlab.com:43217/readcheckin',
    mongoWritehost: 'mongodb://admin:admin123@ds343217.mlab.com:43217/writecheckin',
};

module.exports = {env: env};