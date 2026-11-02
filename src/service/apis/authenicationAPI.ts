import commonAPI from "../commonAPI"
import URL from "../serverUrl"

export const  mentorRegisterAPI = async (reqBody:any)=>{
    return await commonAPI("POST", `${URL}/mentor/register`,reqBody)
}
export const  studentRegisterAPI = async (reqBody:any)=>{
    return await commonAPI("POST", `${URL}/student/register`,reqBody)
}