export class MyFriend{

    constructor(
        public idMyFriends: string,
        public idUser: string,
        public idFriend: string,
        public createDate: Date,
    ){
        this.idMyFriends = idMyFriends;
        this.idUser = idUser;
        this.idFriend = idFriend;
        this.createDate = createDate;
    }


}