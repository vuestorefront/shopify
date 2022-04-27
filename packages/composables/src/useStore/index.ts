import { useStoreFactory, UseStoreFactoryParams } from '@vue-storefront/core'

const params: UseStoreFactoryParams<any> = {
  async change() {},
  async load() {}
}

export default useStoreFactory<any>(params)