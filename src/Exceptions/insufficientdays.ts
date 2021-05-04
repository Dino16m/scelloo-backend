import HttpException from "./http.exception";

export default class InsufficientDays extends HttpException{
    constructor(msg: string){
        super(400, msg)
    }
}