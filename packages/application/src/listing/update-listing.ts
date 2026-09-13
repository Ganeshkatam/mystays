import type { ListingRepositoryPort } from './ports';
import { ApplicationError } from './create-listing';

export async function updateListing(repo: ListingRepositoryPort & { update(id:string,input:{title:string;description:string;monthly_rent:number;deposit:number}):Promise<unknown> }, id:string, input:{title:string;description:string;monthlyRent:number;deposit:number}){
  if(!/^[0-9a-f-]{36}$/i.test(id)||!input.title.trim()||!input.description.trim()||!Number.isFinite(input.monthlyRent)||input.monthlyRent<0||!Number.isFinite(input.deposit)||input.deposit<0) throw new ApplicationError('VALIDATION_FAILED','Listing update is invalid.');
  return repo.update(id,{title:input.title.trim(),description:input.description.trim(),monthly_rent:input.monthlyRent,deposit:input.deposit});
}
