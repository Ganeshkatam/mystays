export async function updateInquiry(repo:{updateProviderStatus(id:string,userId:string,status:'viewed'|'responded'|'closed',response?:string):Promise<unknown>},id:string,userId:string,status:'viewed'|'responded'|'closed',response?:string){
 if(!/^[0-9a-f-]{36}$/i.test(id)||!['viewed','responded','closed'].includes(status)) throw new Error('INVALID_INQUIRY_UPDATE');
 if(status==='responded'&&(!response?.trim()||response.trim().length>5000)) throw new Error('INVALID_INQUIRY_RESPONSE');
 return repo.updateProviderStatus(id,userId,status,response);
}
