import {connectionStr,data} from '@/lib/db';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import {Log}from '@/lib/modal/log'
export async function GET(){
    let data =[];
try{

    await mongoose.connect(connectionStr);
   data=await Log.find();
    var total_entries = await Log.countDocuments();
    total_entries = await Log.countDocuments({  });
}
catch (error)
{
data =['nodata found']
}
return NextResponse.json({result:data, sucese:true, total_entries})
}



export async function POST (request){
    const payload =await request.json();
   
    var currentdate = new Date(); 
  
currentdate.setHours(currentdate.getHours() + 5);
currentdate.setMinutes(currentdate.getMinutes() + 30);   
let newcurrentdate=currentdate.getHours() +":"+ currentdate.getMinutes()+":"+currentdate.getSeconds() +"\xa0\xa0\xa0\xa0\xa0"+ currentdate.getDate() +"-"+ parseInt(currentdate.getMonth())+parseInt(1) +"-"+ currentdate.getFullYear()
  
 payload['time'] = newcurrentdate;
    //console.log(payload)
    await mongoose.connect(connectionStr);
    let log =new Log (payload)
    const result =await log.save();
    return NextResponse.json({result,sucess:true})
}
