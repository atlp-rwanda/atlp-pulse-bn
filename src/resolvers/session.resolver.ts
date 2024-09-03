import Session from '../models/session.model';

const Sessionresolvers = {
  Query: {
    getSession: async (_: any, { id }: any) => {
      return await Session.findById(id);
    },
    getAllSessions: async () => {
      return await Session.find();
    },
  },
  Mutation: {
    createSession: async (_:any, { sessionInput: { Sessionname, description,  platform,duration, organizer} }:any) => {
      const createdSession = new Session({
        Sessionname: Sessionname,
        description: description,
        platform:platform,
        duration:duration,
        organizer:organizer
        
    
      });
    
      try {
        const res = await createdSession.save();
        return {
          id: res._id.toString(),
          Sessionname: res.Sessionname,
          description: res.description,
          platform:res.platform,
          duration:res.duration,
          organizer:res.organizer 
        };
      } catch (error) {
         console.error("Failed to create new session:", error);
        throw new Error("Failed to create new session");
      }
    },
    
    deleteSession: async (_:any, { ID }:any) => {
      const wasDeleted = (await Session.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted === 1;
    },
    editSession: async (_: any, { ID, editSessionInput: { Sessionname, description, platform, duration, organizer } }: any) => {
      const session = await Session.findById(ID);
    
      if (!session) {
        throw new Error("Session not found");
      }
    
      session.Sessionname = Sessionname;
      session.description = description;
      session.platform = platform;
      session.duration = duration;
      session.organizer = organizer;
    
      try {
        await session.save();
        return true;
      } catch (error) {
        console.error("Failed to update session:", error);
        throw new Error("Failed to update session");
      }
    },
    
  },
};

export default Sessionresolvers;