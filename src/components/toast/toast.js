import cogoToast from "cogo-toast"

const options = { 
    hideAfter: 1,
    position: "top-right" 
}

const success = (msg) => {
    return cogoToast.success(msg, options)
}

const error = (msg) => {
    return cogoToast.error(msg, options)
}

const warning = (msg) => {
    return cogoToast.warning(msg, options)
}

export default {
    success,
    error,
    warning
}