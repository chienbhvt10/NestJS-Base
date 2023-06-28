import type { QueryResolvers } from './../../../types.generated';
export const room: NonNullable<QueryResolvers['room']> = async (
  _parent,
  _arg,
  _ctx,
) => {
  /* Implement Query.room resolver logic here */
  return {
    id: 1,
    name: 'Room 1',
  };
};
