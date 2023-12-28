

import { createClient } from 'redis';

const client = createClient({legacyMode: true, url: "redis://127.0.0.1:6379"});

type Opt = {
    scope ? : string | string[]
};

(async () => {
    try {
        await client.connect();
    } catch (err) { 
        console.error(err)
    }
})();


const expirationTime = 3000;
const userKeyFormat = 'user.id=';

export async function setCache(userId: string, data: any){
    try {
        var key = userKeyFormat+userId;
        return await set(key, data);
    }catch(e){
        console.log(e)
    }
}

async function set(key: string, data: any){
    try{
        await client.set(key, JSON.stringify(data));
        await client.expire(key, 86400);
    }catch(e){
        console.log("Set cache error: ", e)
    }
}

export default function (opt: Opt = {}) {
    return async function getCache(req: any, res: any, next: any){
        const userId = req.body.userId
        let key = userKeyFormat+userId;
        try{
            let data = await get(key);
            if(data){
                return JSON.parse(data);
            }
            else{
                return next();
            }

        }catch(e){
            console.log(e)
        }
    }
}

async function get(key: string) {
    try{
        return await client.get(key);
    }catch(e){
        console.log(e)
    }
}

export async function clearCache(userId: string){
    try{
        const key = userKeyFormat+userId;
        return await clear(key);
    }catch(e){
        console.log(e)
    }
   
}

async function clear(key: string){
    try{
        return  await client.del(key);
    }catch(e){
        console.log(e)
    }
}