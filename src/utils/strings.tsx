export const shortenHexString = (string: string) => {
  return `${string.slice(0, 6)}...${string.slice(-4)}`;
};
