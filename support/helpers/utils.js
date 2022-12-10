export const randomString = (length) => [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join("");

export const utcTimestamp = () => new Date().toISOString() + " -- ";
