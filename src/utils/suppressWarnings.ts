// Only run this in development mode
if (process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (args[0]?.includes('useLayoutEffect does nothing on the server')) {
      return;
    }
    originalError.call(console, ...args);
  };
}
