/* eslint-disable @typescript-eslint/no-unused-vars */
import { customerAddressAddMutation as mutation } from './../customerMutations/buildMutations';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function addAddress(context, params) {
  const { token, address } = params;
  const data = {
    address: address,
    customerAccessToken: token
  };
  const addedAddressId = await context.client.graphQLClient.send(mutation(context), data).then(({ model }) => {
    if (model) {
      return model.customerAddressCreate;
    }
  });
  return addedAddressId;
}
