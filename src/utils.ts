export function waitForTruthy<T>(fn: () => T | undefined): Promise<T> {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      const result = fn();
      if (result) {
        clearInterval(interval);
        resolve(result);
      }
    }, 30);
  });
}
