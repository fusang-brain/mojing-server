export interface MemberDTO {
    phone?: string;
    password: string;
    headPortrait: string;
    memberName:string;
    validateCode:string;
  }
  
  export interface AppLoginDTO {
    phone: string;
    password: string;
    validateCode:string;
  }