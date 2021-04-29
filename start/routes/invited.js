'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.group(()=>{
  Route.get('party/:id', 'InvitController.invite').as('invited')
  Route.get('checkin/:slug', 'InvitController.checkin').as('invited.checkin')
  Route.put('invited/:id', 'InvitController.update').as('invited.update')
  Route.put('invited/:id/qrcode', 'InvitController.makeCode').as('make.qrcode')
}).prefix('v1/').namespace('Invited')
