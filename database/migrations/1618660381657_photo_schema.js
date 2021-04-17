'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PhotoSchema extends Schema {
  up () {
    this.create('photos', (table) => {
      table.increments()
      table.string('path',256).notNullable()
      table.timestamps()
      table.integer('owner')
      table.integer('party_id')
      table.foreign('party_id').references('parties.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('photos')
  }
}

module.exports = PhotoSchema
