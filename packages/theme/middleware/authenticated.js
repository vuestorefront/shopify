/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line func-names
export default (context) => {
  const appKey = context.$config.appKey;
  const token = context.$cookies.get(appKey + '_token');
  // check if user not logged In
  if (!token) {
    context.app.router.push('/');
    context.redirect('/');
  }
};
