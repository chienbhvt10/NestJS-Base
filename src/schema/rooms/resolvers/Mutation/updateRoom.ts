import type { MutationResolvers } from './../../../types.generated';
export const updateRoom: NonNullable<MutationResolvers['updateRoom']> = async (
  _parent,
  _arg,
  _ctx,
) => {
  /* Implement Mutation.updateRoom resolver logic here */
  return {
    id: 1,
    name: 'Room 1',
  };
};
