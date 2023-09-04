export const isProduction = process.env.NODE_ENV === 'production';

export const apiUrls = {
  contractApi: isProduction
    ? 'https://contract-api.cryptodo.app'
    : 'https://contract-api.staging.cryptodo.app',
};
