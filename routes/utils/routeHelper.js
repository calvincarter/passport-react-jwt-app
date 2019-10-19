module.exports = () => {
    if(!process.env.NODE_ENV) {
        return process.env.REACT_DEV_SERVER;
    }
    return "../client/build/index.html";
}