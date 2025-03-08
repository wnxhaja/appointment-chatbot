// sessionStore.ts
const sessionMap = new Map<string, Session>();

export type Session = {
  step: 'init' | 'name' | 'date' | 'confirm' | 'list';
  name?: string;
  date?: string;
};

export const sessionStore = {
  get: ( userId: string ): Session | undefined => sessionMap.get( userId ),
  set: ( userId: string, session: Session ) => sessionMap.set( userId, session ),
  del: ( userId: string ) => sessionMap.delete( userId ),
};
