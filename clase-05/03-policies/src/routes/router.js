import { Router as ExpressRouter } from "express";

export default class Router {
    constructor() {
        this.router = ExpressRouter() // const router = Router()
        this.init()
    }

    getRouter(){
        return this.router
    }

    init(){} // esto se implementa en cada clase hija

    get(path, ...callbacks){
        this.router.get(path, this.generateCustomResponse, this.applyCallbacks(callbacks))
    }

    post(path, ...callbacks){
        this.router.get(path, this.generateCustomResponse, this.applyCallbacks(callbacks))
    }

    put(path, ...callbacks){
        this.router.get(path, this.generateCustomResponse, this.applyCallbacks(callbacks))
    }

    delete(path, ...callbacks){
        this.router.get(path, this.generateCustomResponse, this.applyCallbacks(callbacks))
    }

    generateCustomResponse(req, res, next) {
        res.sendSuccess = payload => {
            res.json({ status: 'success', message: payload })
        }

        res.sendServerError = error => {
            res.status(500).json({ status: 'internal error', error })
        }

        res.sendUserError = error => {
            res.status(400).json({ status: 'error', error })
        }

        next()
    }

    applyCallbacks(callbacks){
        return callbacks.map(callback => async(...params) => {
            try {
                await callback.apply(this, params)
            } catch (error) {
                params[1].status(500).send({error})
            }
        })
    }
}