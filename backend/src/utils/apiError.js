const apiError = (statusCode, message = "Something went worng", error = {}) => {
    return {
        statusCode: statusCode,
        message: message,
        error: error || null,
        success: false
    }
}

export {apiError}