/**
 * Get the time difference in seconds
 */
export const timeDifference = (string, start, end) => {
  const elapsed = (end - start) / 1000;
  console.log(`${string} It took ${elapsed} seconds.`);
};

/**
 * Generate random integer between two values, inclusive
 * @param min
 * @param max
 * @returns {number}
 */
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const randomString = (length) => [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('');

export const utcTimestamp = () => new Date().toISOString() + ' -- ';
