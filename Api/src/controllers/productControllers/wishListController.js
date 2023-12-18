const {WishList,User}=require('../../db')

const getWishListController=async()=>{

        const list=await WishList.findAll()
        if(list.length===0){
            return {
                error: true,
                response: `La lista de deseos está vacía.`,
              };
        }
        return list
        
}

module.exports={getWishListController}