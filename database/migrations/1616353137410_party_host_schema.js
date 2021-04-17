'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PartyHostSchema extends Schema {
  up () {
    this.create('party_hosts', (table) => {
      table.increments()
      table.string('name')
      table.string('phone')
      table.integer('address_id')
      table.integer('owner')
      table.string('message', 1024)
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
