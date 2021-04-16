'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.group(()=>{
  Route.get('party/:id', 'InvitController.invite').as('invited')
  Route.put('invited/:id', 'InvitController.update').as('invited.update')
}).prefix('v1/').namespace('Invited')
