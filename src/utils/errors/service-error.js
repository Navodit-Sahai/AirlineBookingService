const {StatusCodes}=require('http-status-codes');

class ServiceError extends Error{
    constructor(message,explanation='service layer error',statusCode=StatusCodes.INTERNAL_SERVER_ERROR){
        super();
        this.name='Service Error',
        this.message=message,
        this.explanation=explanation,
        this.statusCode=statusCode

    }
}
module.exports=ServiceError;