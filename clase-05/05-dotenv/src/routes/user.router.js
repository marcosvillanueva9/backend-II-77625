import Router from "./router.js";
import { handlePolicies } from "../middlewares/handlePolicies.js";

export default class UserRouter extends Router {
    init(){
        this.get('/', handlePolicies(["PUBLIC"]), (req, res) => {
            res.sendSuccess('hola a todos! esta vista es publica')
        })

        this.get('/currentUser', handlePolicies(["USER", "ADMIN"]), (req, res) => {
            res.sendSuccess(req.user)
        })

        this.get('/currentAdmin', handlePolicies(["ADMIN"]), (req, res) => {
            res.sendSuccess(req.user)
        })
    }
}