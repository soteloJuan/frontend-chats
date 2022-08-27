export interface LatestConversationsInterfaces{
    idConversation: string,
    idUser: string,
    userWhoCreatedMessage: string
    userName?: string,
    urlImage?: string,
    bodyMessage: string,
    messageTime: Date,
    messageMilliseconds: number
    messageDays: any,
    messageHour: any
}