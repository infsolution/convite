'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PresentLinkSchema extends Schema {
  up () {
    this.create('present_links', (table) => {
      table.increments()
      table.string('url_present')
      table.enu('level',['QUERO MUITO','BEM LEGAL', 'LEGAL'])
      table.timestamps()
      table.integer('party_id')
      table.foreign('party_id').references('parties.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('present_links')
  }
}

module.exports = PresentLinkSchema
