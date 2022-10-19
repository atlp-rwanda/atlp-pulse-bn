export const authenticated =
  (next: (arg0: any, arg1: any, arg2: any, arg3: any) => any) =>
  (root: any, args: any, context: { userId: any }, info: any) => {
    if (!context.userId) {
      throw new Error('Unauthenticated!');
    }

    return next(root, args, context, info);
  };

export const validateRole =
  (role: any) =>
  (next: (arg0: any, arg1: any, arg2: any, arg3: any) => any) =>
  (root: any, args: any, context: { role: { role: any } }, info: any) => {
    if (context.role !== role) {
      throw new Error('only authorized users can perform operation!');
    }

    return next(root, args, context, info);
  };
