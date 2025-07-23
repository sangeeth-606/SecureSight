// Helper to get the backend base URL based on environment
export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_IS_PROD === 'true'
    ? 'https://securesight-axks.onrender.com'
    : 'http://localhost:3002';
};
