const {Router}=require('express')
const {PostHistory,getHistoryByUser,deleteHistory}=require('../../handlers/userHandlers/userHistoryHandler')

const useRouter=Router()

useRouter.post('/:id',PostHistory)
useRouter.get('/:id',getHistoryByUser)
useRouter.put('/:id',deleteHistory)



module.exports=useRouter