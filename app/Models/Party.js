'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Party extends Model {
  static get hidden(){
    return ['base64']
  }


  address(){
    return this.belongsTo('App/Models/Address')
  }
  partyHost(){
    return this.hasOne('App/Models/PartyHost')
  }

  inviteds(){
    return this.hasMany('App/Models/Invited')
  }
  presents(){
    return this.hasMany('App/Models/PresentLink')
  }
  galery(){
    return this.hasMany('App/Models/Photo')
  }
}

module.exports = Party
