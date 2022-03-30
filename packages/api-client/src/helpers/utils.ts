export const isAnonymousSession = (token) => token?.scope?.includes('anonymous_id');
export const isUserSession = (token) => token?.scope?.includes('customer_id');
export const getAccessToken = (token) => token ? token.access_token : null;
export const getCountry = (context, isProduct = false, defaultLocale = 'en', curLocale = 'en') => {
    if (isProduct) { 
        return curLocale === "en" ? (defaultLocale).toUpperCase() : (curLocale).toUpperCase();
    }
    return context.res.req.cookies['vsf-locale'] ? context.res.req.cookies['vsf-locale'] === "en" ? "US" : (context.res.req.cookies['vsf-locale']).toUpperCase() : "US";
}
    