'use strict'
const Factory = use('Factory')
/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })

Factory.blueprint('App/Models/User', (faker) => {
  return {
   name:faker.first(),
   username: faker.username(),
   email: faker.email({domain: 'tmenu.com'}),
   password: '123456',
   phone: faker.phone()
  }
})
