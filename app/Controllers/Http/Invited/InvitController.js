'use strict'
const Party = use('App/Models/Party')
const Invited = use('App/Models/Invited')
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
  async invite ({ params, request, response }) {
    try {
      const invited = await Invited.query().where('slug',params.invited)
      .with('qrcode')
      .first()
      if(!invited){
        return response.status(400).send({error: 'Dados não encontrados!'})
      }
      const party = await Party.query().where('id',params.id)
      .with('partyHost')
      .with('address')
      .first()
      if(!party){
        return response.status(400).send({error: 'Dados não encontrados!'})
      }
      party.invited = invited
      return response.send({party})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }
}

module.exports = InvitController
