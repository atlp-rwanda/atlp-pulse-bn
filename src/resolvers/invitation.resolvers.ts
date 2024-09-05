import { GraphQLError } from 'graphql';
import { Invitation } from '../models/invitation.model';
import { IResolvers } from '@graphql-tools/utils';
import { checkUserLoggedIn } from '../helpers/user.helpers';
import { checkLoggedInOrganization } from '../helpers/organization.helper';
import { sendEmail } from '../utils/sendEmail';
import  jwt  from 'jsonwebtoken';
import { User } from '../models/user';
import inviteUserTemplate from '../utils/templates/inviteUserTemplate';


const SECRET: string = process.env.SECRET ?? 'test_secret'
const invitationResolvers: IResolvers = {
  Mutation: {
    sendInvitation: async (
      _,
      { invitees, orgToken,type}: { invitees: { email: string; role: string }[]; orgToken: string;type:any},
      context
    ) => {
      try {
        const { userId } =(await checkUserLoggedIn(context))(['admin']);
        if (!userId) {
          throw new GraphQLError('User is not logged in',{
            extensions:{
              code:'UNAUTHENTICATED'
            }
          });
        }

        const org = await checkLoggedInOrganization(orgToken);
        if (!org) {
          throw new GraphQLError('Invalid organization token',{
            extensions:{
              code: 'FORBIDDEN'
            }
          });
        }
        const email = invitees.map(invitee => invitee?.email);
        const userExists: any = await User.findOne(
          { email });

        if (userExists) {
          throw new Error(`This user already exists in ${org.name}`)
        } else {
          const token: any = jwt.sign(
            { name: org.name, email:invitees.map(invitee => invitee.email),
              role:invitees.map(invitee => invitee.role )}, SECRET, {
              expiresIn: '2d',
            })
        
          const newToken: any = token.replace(/\./g, '*')
          const newInvitation = new Invitation({
            inviterId:userId.toString(),
            invitees: invitees.map(invitee => ({
              email: invitee.email,
              role: invitee.role
            })),
            orgToken
          });
        
          const link =
          type == 'user'
            ? `${process.env.REGISTER_FRONTEND_URL}/${newToken}`
            : `${process.env.REGISTER_ORG_FRONTEND_URL}/${newToken}`
          const content = inviteUserTemplate(org?.name || '', link)
          const someSpace = process.env.FRONTEND_LINK + 'register'
          await sendEmail(
            email,
            'Invitation',
            content,
            someSpace,
            process.env.ADMIN_EMAIL,
            process.env.ADMIN_PASS
          )
        
          await newInvitation.save();
          return newInvitation;
        }
      } catch (error:any) {
        throw new GraphQLError(error.message,{
          extensions:{
            code: 'INTERNAL_SERVER_ERROR'
          }
        });
      }
    },
  },
};

export default invitationResolvers;
