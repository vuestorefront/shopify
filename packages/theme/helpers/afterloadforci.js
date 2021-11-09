// callback - the function to run after onLoad
// delay - wait X milliseconds after onLoad
export const afterLoad = (callback, delay = 10) => {
  // missed the load event, run now
  if (document.readyState === 'complete') {
    setTimeout(() => callback(), delay);
  } else {
    // eslint-disable-next-line func-names
    window.addEventListener('load', () => {
      setTimeout(() => callback(), delay);
    });
  }
};
