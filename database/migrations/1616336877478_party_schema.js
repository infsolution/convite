'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PartySchema extends Schema {
  up () {
    this.create('parties', (table) => {
      table.increments()
      table.date('date').notNullable()
      table.time('hour',{precision:4}).notNullable()
      table.string('local', 80)
      table.integer('address_id')
      table.string('costume')
      table.string('present_store')
      table.string('invite_path_image',256)
      table.integer('owner').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('parties')
  }
}

module.exports = PartySchema
