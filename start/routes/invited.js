'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.group(()=>{
  Route.get('party/:id/:invited', 'InvitCon:troller.invite').as('invited')
}).prefix('v1/').namespace('Invited')
