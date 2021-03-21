'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InvitSchema extends Schema {
  up () {
    this.create('invits', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.integer('owner').notNullable()
      table.timestamps()
      table.integer('invited_id')
      table.foreign('invited_id').references('inviteds.id').onDelete('cascade')
      table.integer('party_host_id')
      table.foreign('party_host_id').references('party_hosts.id').onDelete('cascade')
      table.integer('party_id')
      table.foreign('party_id').references('parties.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('invits')
  }
}

module.exports = InvitSchema
