import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { validateListingInput } from '@mystays/validation';
export async function POST(request:Request){const requestId=randomUUID();let body:unknown;try{body=await request.json();}catch{return NextResponse.json({data:null,error:{code:'INVALID_JSON',message:'Request body must be valid JSON.'},meta:{requestId}},{status:400});}const issues=validateListingInput(body);if(issues.length){return NextResponse.json({data:null,error:{code:'VALIDATION_FAILED',message:'Listing input is invalid.'},meta:{requestId}},{status:422});}return NextResponse.json({data:null,error:{code:'AUTHENTICATION_REQUIRED',message:'Authentication is required to create a listing.'},meta:{requestId}},{status:401});}
