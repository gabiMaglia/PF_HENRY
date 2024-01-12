const {Router}=require('express')
const {PostHistory}=require('../../handlers/userHandlers/userHistoryHandler')

const useRouter=Router()

useRouter.post('/',PostHistory)



module.exports=useRouter