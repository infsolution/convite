'use strict'
const Party = use('App/Models/Party')
const Invited = use('App/Models/Invited')
const PresentLink = use('App/Models/PresentLink')
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
      party.invite_path_image = `${request.protocol()}://${request.hostname()}:3333/v1/download/img/${party.invite_path_image}`
      const online_presents = await party.presentLinks().fetch()
      const partyhost = await party.partyHost().first()
      const address = await party.address().first()
      data.party = party
      data.partyhost = partyhost
      data.address = address
      data.presentLinks = online_presents
      return response.send({data})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Update invited details.
   * PUT or PATCH inviteds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const confirm = request.input('confirm')
      const today = new Date()
      const year = today.getUTCFullYear()
      const month = `0${today.getUTCMonth()+1}`.slice(-2)
      const day = `0${today.getUTCDate()}`.slice(-2)
      const invited = await Invited.find(params.id)
      invited.confirmation = confirm
      invited.date_confirmation = `${year}-${month}-${day}`
      await invited.save()
      return response.send({result:true})
    } catch (error) {
      console.log(error)
      return response.status(400).send({result: false})
    }
  }
}

module.exports = InvitController
