import devConfig from './dev';
import prodConfig from './prod';
import testConfig from './test';

interface iConfig{
  API_URL: string;
  API_NAMESPACE: string;
}

console.log('NODE_ENV ====> :', process.env.NODE_ENV);
/* eslint-disable no-nested-ternary */
const config:iConfig = process.env.NODE_ENV === 'production'
  ? prodConfig : process.env.NODE_ENV === 'test'
    ? testConfig : devConfig;
/* eslint-disable no-nested-ternary */

export default config;
