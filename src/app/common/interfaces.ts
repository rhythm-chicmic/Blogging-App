export interface loginModel {
    email: string,
    password: string,
}
export interface signUpModel {
    email: string,
    firstName: string,
    lastName:string,
    password: string,
    dateOfBirth:string,
    phoneNo:number
}
export interface forgotPasswordModel {
    email: string,
    url : string
}
export interface resetPasswordModel {
    token: string, // token we get on email on resetPassword link's querry
    newPassword: string,
    confirmPassword: string,
}

export interface updatePasswordModel {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
}
export interface googleLoginModel {
    token: string
}