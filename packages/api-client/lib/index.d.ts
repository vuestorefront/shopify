declare const createApiClient: {
    (config: any, customApi?: any): import("@vue-storefront/core").ApiClientInstance;
    tag: string;
};
export { createApiClient };
export * from './types';
export * from './fragments';
export * from './types/Api';
export * from './helpers/queries';
