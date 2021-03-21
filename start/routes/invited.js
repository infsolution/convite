'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.group(()=>{
  Route.resource('client/:name/invit/:invited', 'InvitedController').apiOnly()
}).prefix('v1/').namespace('Invited')
