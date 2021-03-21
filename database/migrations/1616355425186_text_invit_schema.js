'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TextInvitSchema extends Schema {
  up () {
    this.create('text_invits', (table) => {
      table.increments()
      table.text('text').notNullable()
      table.timestamps()
      table.integer('invit_id')
      table.foreign('invit_id').references('invits.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('text_invits')
  }
}

module.exports = TextInvitSchema
