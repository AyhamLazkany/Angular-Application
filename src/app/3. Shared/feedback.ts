export class Feedback {
    firstname!:string;
    lastname!:string;
    telnum!:number;
    email!:string;
    contact!:boolean;
    contype!:string ;
    message!:string;
}
export const ConType : string [] = ['None','Email','Phone'];