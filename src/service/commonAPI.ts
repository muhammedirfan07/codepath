import axios from "axios";

const commonAPI = async (httpMethod: string, url: string, reqBody?: any, reqHeader?: any) => {
  const reqConfig={
    method:httpMethod,
    url,
    data: reqBody,               
    headers: reqHeader ? reqHeader : {"Content-Type":"application/json"},  
  }
  return axios(reqConfig).then(res=>{
    return res
  }).catch(error=>{
    return error
  })

}

export default commonAPI