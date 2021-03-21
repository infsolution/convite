'use strict'
const Factory = use('Factory')
const Role = use('Role')
/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

class RoleSeeder {
  async run () {
    await Role.create({
      name: 'Admin',
      slug:'admin',
      description:'Administrator of TMenu'
    })
    await Role.create({
      name: 'Client',
      slug: 'client',
      description: 'Client of establishments TMenu'
    })
  }
}

module.exports = RoleSeeder
