/* eslint-disable @typescript-eslint/no-unused-vars */
import { customerAddressUpdateMutation as mutation } from './../customerMutations/buildMutations';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function updateAddress(context, params) {
  const { token, AddressId, address } = params;
  const data = {
    id: AddressId,
    address,
    customerAccessToken: token
  };
  const updatedAddressId = await context.client.graphQLClient.send(mutation(context), data).then(({ model }) => {
    if (model) {
      return model.customerAddressUpdate;
    }
  });
  return updatedAddressId;
}
