'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Invited extends Model {
    qrcode(){
        return this.hasOne('App/Models/Qrcode')
    }
}

module.exports = Invited
