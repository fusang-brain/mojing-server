export interface UserDTO {
  enterpriseName?: string;
  user: {
    mobile?: string;
    email: string;
    password: string;
    realname: string;
  };
  validateCode?: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}