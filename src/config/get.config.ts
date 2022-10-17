import { devConfig } from "./dev.config";
import { preProdConfig } from "./preprod.config";
import { testConfig } from "./test.config";

export const getConfig = () => {
  if (process.env.NODE_ENV == 'preprod') {
    console.log('Preprod');
    return preProdConfig
  } else if (process.env.NODE_ENV == 'test') {
    console.log('test');
    return testConfig;
  } else {
    console.log('Dev');
    return devConfig;
  }
}
