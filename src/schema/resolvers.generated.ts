/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { Class } from './classes/resolvers/Class';
import    { updateRoom as Mutation_updateRoom } from './rooms/resolvers/Mutation/updateRoom';
import    { clas as Query_clas } from './classes/resolvers/Query/clas';
import    { classes as Query_classes } from './classes/resolvers/Query/classes';
import    { room as Query_room } from './rooms/resolvers/Query/room';
import    { rooms as Query_rooms } from './rooms/resolvers/Query/rooms';
import    { Room } from './rooms/resolvers/Room';
    export const resolvers: Resolvers = {
      Query: { clas: Query_clas,classes: Query_classes,room: Query_room,rooms: Query_rooms },
      Mutation: { updateRoom: Mutation_updateRoom },
      
      Class: Class,
Room: Room
    }