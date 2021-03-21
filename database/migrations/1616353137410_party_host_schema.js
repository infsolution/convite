'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PartyHostSchema extends Schema {
  up () {
    this.create('party_hosts', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
      table.integer('party_id')
      table.foreign('party_id').references('parties.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('party_hosts')
  }
}

module.exports = PartyHostSchema
