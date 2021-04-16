'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvitedSchema extends Schema {
  up () {
    this.create('inviteds', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('phone')
      table.string('slug').notNullable().unique()
      table.integer('number_companions').notNullable().defaultTo(0)
      table.enu('confirmation',['VOU','NÃO VOU', 'SEM RESPOSTA']).notNullable().defaultTo('SEM RESPOSTA')
      table.date('date_confirmation')
      table.timestamps()
      table.integer('party_id')
      table.foreign('party_id').references('parties.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('inviteds')
  }
}

module.exports = InvitedSchema
