import { User } from './user.model';

export interface Invite {
    link: string
    userToken: string
    boxToken: string
    expiry: string
    createdAt: Date
    updatedAt: Date
}

export type PopulatedInvite = {
    userToken: Partial<User>
} & Invite
