'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QrcodeSchema extends Schema {
  up () {
    this.create('qrcodes', (table) => {
      table.increments()
      table.string('path',256).notNullable()
      table.integer('invited').notNullable()
      table.timestamps()
    })
  }
  down () {
    this.drop('qrcodes')
  }
}

module.exports = QrcodeSchema
