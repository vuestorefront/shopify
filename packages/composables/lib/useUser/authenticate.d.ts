import { CustomerSignMeInDraft, CustomerSignMeUpDraft } from '../types/graphQL';
declare type UserData = CustomerSignMeUpDraft | CustomerSignMeInDraft;
export declare const authenticate: (userData: UserData, fn: any) => Promise<any>;
export {};
