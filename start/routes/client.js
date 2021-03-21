'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
//Route.get('/v1/:slug', 'Client/TableController.menu').as('menu')
//Route.get('v1/client/product/:id', 'Client/ProductController.show').as('client.product')
//Route.get('v1/client/category/:id','Client/CategoryController.show').as('clinet.category')
Route.group(()=>{
    Route.resource('profile','ClientController').apiOnly()
    Route.resource('party','PartyController').apiOnly()
    Route.resource('party-host','PartyHostController').apiOnly()
    Route.resource('address','AddressController').apiOnly()
    Route.resource('invited','InvitedController').apiOnly()
}).prefix('v1/client').namespace('Client').middleware(['auth', 'is:client'])