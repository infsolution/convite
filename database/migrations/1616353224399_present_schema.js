'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PresentSchema extends Schema {
  up () {
    this.create('presents', (table) => {
      table.increments()
      table.string('link_present').notNullable()
      table.integer('party_id')
      table.foreign('party_id').references('parties.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('presents')
  }
}

module.exports = PresentSchema
