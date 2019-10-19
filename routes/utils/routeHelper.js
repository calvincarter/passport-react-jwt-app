module.exports = () => {
    if(!process.env.NODE_ENV) {
        return process.env.REACT_DEV_SERVER;
    }
    return process.env.REACT_APP_PROD_URL;
}