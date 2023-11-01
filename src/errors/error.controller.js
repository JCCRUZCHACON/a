import { envs } from "../config/enviroments/enviroments.js";
import { AppError } from "./appError.js";
import Error from "./error.model.js";


const handlerCastError22001 = () =>
    new AppError("value too long for type on attribute", 400)


const handleCastErrer23505 = () => {
    return new AppError("duplicate field value: please use another value", 400)
}

const handleJWTExpiedError = () => 
    new AppError("your token has expired! please login again", 401)

const handleJWTError = () => {
    return AppError("invalid token. Plase login again", 401)
}

const handleCastErrer22P02 = () => 
    new AppError("invalid type in database", 400)


const sendErrorDev = (err, res) => {
    return res.status(err.statusCode).json({
      status: err.status,
      message : err.message,
      stack: err.stack,
      error: err
    })
  }

const sendErrorPro = async (err, res) => {
    await Error.create({
        status: err.status,
        message: err.message,
        error: err
    })
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        console.log("error", err);
        res.status(500).json({
            status: "fail",
            message: "something went very wrong!"
        })
    }
}


export const globalErrorHandler = (err, req, res, next)=> {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "fail"

    if (envs.NODE_ENV === "development") {
        sendErrorDev(err, res)
    }

    if (envs.NODE_ENV === "production") {
        let error = err
        if(err.parent?.code === '22001') error = handlerCastError22001()
        if(err.parent?.code === '23505') error = handleCastErrer23505()
        if(err.parent?.code === '22P02') error = handleCastErrer22P02()
        if(err.name === "TokenExpiredError") error = handleJWTExpiedError()
        if(err.name === "JsonWebTokenError") error = handleJWTError()

        sendErrorPro(error, res)
    }

    
}