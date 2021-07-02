export interface Roles {
    student?:boolean;
    instructor?:boolean;
    admin?:boolean;
}

export interface User {
    uid:string;
    email:string;
    firstName:string;
    lastName:string;
    displayName:string;
    phoneNumber:string;
    photoURL:string;
    role:Roles;
}
