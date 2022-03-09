
export const createDefaultError = (message: string, context: any) => ({
    "type": "error",
    "payload": {
        "message": message,
        "context": context,
    }
})

export const createDefaultSucces = (message: string, context: any) => ({
    "type": "success",
    "payload": {
        "message": message,
        "context": context,
    }
})