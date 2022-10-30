import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
async function main(){
    await prisma.user.create({
        data : {
            username : "dummy",
            password : "123"
        }
    })

}
main()

console.log("hehehe");
