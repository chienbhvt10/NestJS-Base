import type { QueryResolvers } from './../../../types.generated';
export const rooms: NonNullable<QueryResolvers['rooms']> = async (
  _parent,
  _arg,
  _ctx,
) => {
  /* Implement Query.rooms resolver logic here */
  return [
    { id: 1, name: 'rooms' },
    { id: 2, name: 'room2' },
  ];
};
