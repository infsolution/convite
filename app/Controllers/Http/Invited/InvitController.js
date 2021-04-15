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
      const data = {}
      const invited = await Invited.query().where('id',params.id).first()
      if(!invited){
        return response.status(400).send({data:null})
      }
      data.invited = invited
      const qrcode = await invited.qrcode().first()
      data.qrcode = qrcode
      const party = await Party.query().where('id',invited.party_id).first()
      if(!party){
        return response.status(400).send({data:null})
      }
      const partyhost = await party.partyHost().first()
      const address = await party.address().first()
      data.party = party
      data.partyhost = partyhost
      data.address = address

      return response.send({data})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }
}

module.exports = InvitController
