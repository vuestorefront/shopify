export default {
  scrollBehavior(to, from, savedPosition) {
    // If the returned position is falsy or an empty object, will retain current scroll position
    // savedPosition is only available for popstate navigations (back button)
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  }
};
