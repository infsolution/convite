'use strict'
const Party = use('App/Models/Party')
const Invited = use('App/Models/Invited')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with inviteds
 */
class InvitedController {
  /**
   * Show a list of all inviteds.
   * GET inviteds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const party = await Party.query().where('owner', auth.user.id)
      .where('id', request.input('party_id')).first()
      if(!party){
        return response.status(404).send({message:'Festa não encontrada!'})
      }
      const inviteds = await party.inviteds().fetch()
      return response.send({inviteds})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }


  /**
   * Create/save a new invited.
   * POST inviteds
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.all()
      let name = data.name.toLowerCase()
      name = name.replace(/ /g, "-")
      const party = await Party.find(data.party_id)
      if(!party){
        return response.status(404).send({message:'Festa não encontrada!'})
      }
      const invited = await Invited.create({...data, slug:name})
      return response.status(201).send({invited})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Display a single invited.
   * GET inviteds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth }) {
    try {
      const invited = await Invited.query().where('id',params.id)
      .with('qrcode')
      .first()
      if(!invited){
        return response.status(404).send({message:'Convidado não encontrado!'})
      }
      const party = await Party.query().where('id',invited.party_id).where('owner',auth.user.id).first()
      if(!party){
        return response.status(404).send({message:'Festa não encontrada!'})
      }
      return response.send({invited})
    } catch (error) {
      console.log(error)
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
      const data = require.all()
      const invited = await Invited.find(params.id)
      if(!invited){
        return response.status(404).send({message:'Convidado não encontrado!'})
      }
      const party = await Party.query().where('id',invited.party_id).where('owner',auth.user.id).first()
      if(!party){
        return response.status(404).send({message:'Festa não encontrada!'})
      }
      invited.merge({...data})
      await invited.save()
      return response.send({invited})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Delete a invited with id.
   * DELETE inviteds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response,auth }) {
    try {
      const invited = await Invited.find(params.id)
      if(!invited){
        return response.status(404).send({message:'Convidado não encontrado!'})
      }
      const party = await Party.query().where('id',invited.party_id).where('owner',auth.user.id).first()
      if(!party){
        return response.status(404).send({message:'Festa não encontrada!'})
      }
      await invited.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }
}

module.exports = InvitedController
