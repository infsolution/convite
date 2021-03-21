'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.increments()
      table.string('path',256).notNullable()
      table.boolean('background').notNullable().defaultTo(false)
      table.timestamps()
      table.integer('invit_id')
      table.foreign('invit_id').references('invits.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImageSchema
