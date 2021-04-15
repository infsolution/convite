'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Party extends Model {
  address(){
    return this.belongsTo('App/Models/Address')
  }
  partyHost(){
    return this.hasOne('App/Models/PartyHost')
  }

  inviteds(){
    return this.hasMany('App/Models/Invited')
  }
  presentLinks(){
    return this.hasMany('App/Models/PresentLink')
  }
}

module.exports = Party
