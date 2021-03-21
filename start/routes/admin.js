'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(()=>{
    Route.resource('user', 'UserController').apiOnly()
}).prefix('v1/admin').namespace('Admin').middleware(['auth', 'is:admin'])
