export const isAnonymousSession = (token) => token?.scope?.includes('anonymous_id');
export const isUserSession = (token) => token?.scope?.includes('customer_id');
export const getAccessToken = (token) => token ? token.access_token : null;
export const getCountry = (context) => context.res.req.cookies['vsf-locale'] ? context.res.req.cookies['vsf-locale'] === "en" ? "US" : (context.res.req.cookies['vsf-locale']).toUpperCase() : "US";