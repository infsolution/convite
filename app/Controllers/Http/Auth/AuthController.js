'use strict'

const Database = use('Database')
const User = use('App/Models/User')
const Role = use('Role')
const Mail = use('Mail')
class AuthController {
    async register({request, response}){
        const trx = await Database.beginTransaction()
        try {
            const {name, email, password, phone} = request.all()
            const username = name.slice(1,5)+phone
            const user = await User.create({name, username, email, password, phone}, trx)
            const userRole = await Role.findBy('slug', 'client')
            await user.roles().attach([userRole.id], null, trx)
            await trx.commit()
            await Mail.send('emails.welcome', user.toJSON(), (message) => {
                message
                  .to('avlislorecic@gmail.com')
                  .from('<from-email>')
                  .subject('Welcome to yardstick')
              })
            return response.status(201).send({user})
        } catch (error) {
            console.log(error)
            await trx.rollback()
            return response.status(400).send({message: "Erro ao realizaar o cadastro do usuário"})
        }
    }

    async login({request, response, auth}){
        const {email, password} = request.all()
        let data = await auth.withRefreshToken().attempt(email, password)
        return response.send({data})
    }

    async refresh({request, response, auth}){
        var refresh_token = request.input('refresh_token')
        if(!refresh_token){
            refresh_token = request.header('refresh_token')
        }
        const user = await auth.newRefreshToken().generateForRefreshToken(refresh_token)
        return response.send({user})
    }

    async logout({request, response, auth}){
        var refresh_token = request.input('refresh_token')
        if(!refresh_token){
            refresh_token = request.header('refresh_token')
        }
        const loggedOut = await auth.authenticator('jwt').revokeTokens([refresh_token], true)
        return response.status(204).send({})
    }

    async forgot({request, response}){

    }
    async remember({request, response}){

    }

    async reset({request, response}){

    }
}

module.exports = AuthController

