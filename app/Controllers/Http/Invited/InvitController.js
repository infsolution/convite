'use strict'
const Party = use('App/Models/Party')
const Invited = use('App/Models/Invited')
const Tools = use('App/Utils/Tools')
const Qrcode = use('App/Models/Qrcode')
const QRCode = require('qrcode')
const Helpers = use('Helpers')
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
      const tools = new Tools()
      const invited = await Invited.query().where('id',params.id).first()
      if(!invited){
        return response.status(400).send({data:null})
      }
      data.invited = invited
      const qrcode = await invited.qrcode().first()
      data.qrcode = null
      if(qrcode){
        data.qrcode = `${request.protocol()}://${request.hostname()}:8080/v1/download/img/${qrcode.path}`
      }
      const party = await Party.query().where('id',invited.party_id).first()
      if(!party){
        return response.status(400).send({data:null})
      }
      party.invite_path_image = `${request.protocol()}://${request.hostname()}:8080/v1/download/img/${party.invite_path_image}`
      const online_presents = await party.presents().fetch()
      const partyhost = await party.partyHost().first()
      const address = await party.address().first()
      const galery = await party.galery().fetch()
      data.party = party
      data.partyhost = partyhost
      data.address = address
      data.presents = online_presents
      data.galery = await tools.setUrl(galery, request)
      //console.log(tools.setUrl(galery, request))
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
      const invited = await Invited.find(params.id)
      if(!invited){
        return response.status(404).send({message:'Convidado não encontrado!'})
      }
      const today = new Date()
      const year = today.getUTCFullYear()
      const month = `0${today.getUTCMonth()+1}`.slice(-2)
      const day = `0${today.getUTCDate()}`.slice(-2)

      invited.confirmation = confirm
      invited.date_confirmation = `${year}-${month}-${day}`
      await invited.save()
      if(confirm === 'VOU'){
        const file_data = `${request.protocol()}://${request.hostname()}:3333/v1/checkin/${invited.slug}`
        const file_name = `${file_data.replace(/['/',':','.']/g,"_")}.png`
        const path = `tmp/qrcodes/${file_name}`
        await QRCode.toFile(path,file_data)
        const qrcode = await Qrcode.create({path:file_name, invited_id:invited.id})
      }
      return response.send({result:true})
    } catch (error) {
      console.log(error)
      return response.status(400).send({result: false})
    }
  }

  async makeCode({ params, request, response }){
    try {
      const file_data = request.input('data')
      const file_name = `tmp/qrcodes/${file_data.replace(/['/',':','.']/g,"_")}.png`
      await QRCode.toFile(file_name,file_data)
      return response.send({file_name})
    } catch (error) {
      console.log(error)
      return response.status(400).send({message:error.message})
    }
  }
}

module.exports = InvitController
