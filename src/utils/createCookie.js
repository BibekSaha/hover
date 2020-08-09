const cookieCreator = (name, value) => document.cookie = `${name}=${value};max-age=${31536000};`;
export default cookieCreator;