import { Endpoints } from './api'

export type MiddlewareSettingsConfig = {
  api: {
    domain: string
    storefrontAccessToken: string
    cookies?: string
  },
  currency: string
  country: string
}

/**
 * All available API Endpoints without first argument - `context`, because this prop is set automatically.
 */
export type ContextualizedEndpoints = {
  [T in keyof Endpoints]: Endpoints[T] extends (
    x: any,
    ...args: infer P
  ) => infer R
  ? (...args: P) => R
  : never;
};