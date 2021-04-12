'use strict'

class InvitController {
   /**
   * Display a single invite.
   * GET presents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async invite ({ params, request, response, view }) {
    try {
      return response.send({partyhost:params.name,invited:params.invited})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }
}

module.exports = InvitController
