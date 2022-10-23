import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){

    // await prisma.product.create({
    //   data: {
    //     eskau: "CD0069",
    //     title: "Celana Dalam Superman",
    //     description: "Celana dalam anti bau konci",
    //     price: 15000,
    //   }
    // })

    // const allProducts = await prisma.product.findMany({
    //   include : {
    //     Category:true
    //   }
    // })
    // console.dir(allProducts, {depth:null});
    const product = await prisma.product.update({
      where: {id:3},
      data: {category_id : 3}
    })
    

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)

  })