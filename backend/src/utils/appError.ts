class AppError extends Error{
    statusCode;
    isOperational
    constructor(message:string,statusCode:number){
        super(message)

        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this,this.constructor)

    }
}

export default AppError;