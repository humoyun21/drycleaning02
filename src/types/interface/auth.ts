// --------- Authorization  -------------
export interface ForgotPassword{
    email: string,
}

export interface Signin extends ForgotPassword{
    password: string,
}

export interface Signup extends Signin{
    full_name: string,
    phone_number: string
}

export interface UpdatePassword{
    code: string,
    new_password: string,
    email?: string,
}

export interface AuthVerify{
    code: string,
    email: string,
}

export interface Request{
    sign_up:(data:Signup)=>any,
    sign_in:(data:Signin)=>any,
    auth_verify:(data:AuthVerify)=>any,
    forgot_password:(data:ForgotPassword)=>any,
    update_password:(data:UpdatePassword)=>any,
}


// ------------------------------------