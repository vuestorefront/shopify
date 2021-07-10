/* eslint-disable @typescript-eslint/no-unused-vars */
import { customerAddressDeleteMutation as mutation } from './../customerMutations/buildMutations';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function deleteAddress(context, params) {
  const { token, AddressId } = params;
  const data = {
    id: AddressId,
    customerAccessToken: token
  };
  const deletedAddressId = await context.client.graphQLClient.send(mutation(context), data).then(({ model }) => {
    if (model) {
      return model.customerAddressDelete;
    }
  });
  return deletedAddressId;
}
