import cookies from "next-cookies";

export function unauthPage(context) {
  return new Promise(resolve => {
    const allCookies = cookies(context);

    if (allCookies.token) {
      return context.res.writeHead(302, {
        Location: '/blog'
      }).end();
    }
    return resolve('unauthorized')
  })
}

export function authPage(context) {
  return new Promise(resolve => {
    const allCookies = cookies(context);

    if (!allCookies.token) {
      return context.res.writeHead(302, {
        Location: '/'
      }).end();
    }
    return resolve({
      token: allCookies.token
    });
  });
}
