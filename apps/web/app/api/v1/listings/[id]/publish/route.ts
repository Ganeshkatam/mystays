import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
export async function POST(){return NextResponse.json({data:null,error:{code:'AUTHENTICATION_REQUIRED',message:'Authentication is required to publish a listing.'},meta:{requestId:randomUUID()}},{status:401});}
