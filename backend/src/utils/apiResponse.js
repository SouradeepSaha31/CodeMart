const apiResponse = (statusCode, message = "Something went worng", response = {}) => {
    return {
        statusCode: statusCode,
        message: message,
        status: response || null,
        success: true
    }
}

export {apiResponse}