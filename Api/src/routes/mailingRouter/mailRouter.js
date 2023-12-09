const { Router } = require("express");
const {supportMailHandler} = require('../../handlers/mailingHandler')
const useRouter = Router()


useRouter.post('/support_mail', supportMailHandler)


module.exports = useRouter;
