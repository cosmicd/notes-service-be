const respond = (statusCode, origin, body) => {
  // console.log(statusCode, origin,body);
  return {
    statusCode,
    headers: headers(origin),
    body: JSON.stringify(body)
  };
};

const headers = origin => {
  const allowOrigins = [
    "https://cosmicd.org",
    "https://cosmicd.github.io",
    "http://localhost:3000" // DO NOT use for production builds.
  ];
  if (allowOrigins.includes(origin))
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Credentials": true
    };
  else
    return {
      "Access-Control-Allow-Origin": "*"
    };
};

const success = (origin, body) => respond(200, origin, body);
const failure = (origin, body) => respond(500, origin, body);
module.exports = {
  success,
  failure
};
