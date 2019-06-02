export interface UserDTO {
  enterprise?:string;
  user: {
    email:string;
    password:string;
    realname: string;
  };
}

export interface LoginDTO {
  username:string;
  password:string;
}