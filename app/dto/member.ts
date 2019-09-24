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

  export interface IDcardDTO{
    member?:ObjectID;
    IDcard?:string;
    name?:string;
  }