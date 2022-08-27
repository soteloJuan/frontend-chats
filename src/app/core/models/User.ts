export class User{
    constructor(
        public aboutMe: string,
        public active: boolean,
        public createDate: Date,
        public email: string,
        public fullName: string,
        public idImage:string,
        public idUser: string,
        public password:string,
        public role:string,
        public status: string,
        public urlImage:string,
        public userName: string,
        public idWallpaper:string,
        public urlWallpaper:string,
    ){
        this.aboutMe = aboutMe;
        this.active = active;
        this.createDate = createDate;
        this.email = email;
        this.fullName = fullName;
        this.idImage = idImage;
        this.idUser = idUser;
        this.password = password;
        this.role = role;
        this.status = status;
        this.urlImage = urlImage;
        this.userName = userName;
        this.idWallpaper = idWallpaper;
        this.urlWallpaper = urlWallpaper;
    }

}