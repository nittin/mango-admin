const development = require('./development');
const production = require('./production');

const getDomain = () => {
    if (process.env.NODE_ENV === 'production') {
        return production.domain;
    }
    return development.domain
};
const domain = getDomain();

export {
    domain,
};
