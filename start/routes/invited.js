'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.group(()=>{
  Route.get('client/:name/:invited', 'InvitController.invite').as('invited')
}).prefix('v1/').namespace('Invited')
