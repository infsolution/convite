'use strict'
const User = use('App/Models/User')
const Factory = use('Factory')
const Role = use('Role')
/*
|--------------------------------------------------------------------------
| 0002AdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */


class AdminSeeder {
  async run () {
    const roleAdmin = await Role.findBy('slug', 'admin')
    const roleClient = await Role.findBy('slug','client')
    const admin = await User.create({
      name: 'Cicero Leonardo',
      username: 'Cicero',
      email: 'cicero@tmenu.com',
      password: '123456',
      phone: '88888-8888'
    })
    await admin.roles().attach([roleAdmin.id])

    const clients = await Factory.model('App/Models/User').createMany(3)
    await Promise.all(
      clients.map(async client => {
        await client.roles().attach([roleClient.id])
      })
    )
  }
}

module.exports = AdminSeeder
