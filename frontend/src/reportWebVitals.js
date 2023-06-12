const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(
      ({ getCLS, getFID, getFCP, getLCP, getwoff2B }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getwoff2B(onPerfEntry);
      }
    );
  }
};

export default reportWebVitals;
