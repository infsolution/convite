'use strict'
const PartyHost = use('App/Models/PartyHost')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with partyhosts
 */
class PartyHostController {
  /**
   * Show a list of all partyhosts.
   * GET partyhosts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const party_hosts = await PartyHost.query().where('owner', auth.user.id).fetch()

      if(!party_hosts.rows.length){
        return response.status(404).send({message:'Você não tem nenhum Anfitrião!'})
      }
      return response.send({party_hosts})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }

  }



  /**
   * Create/save a new partyhost.
   * POST partyhosts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.all()
      const pHost = await PartyHost.create({...data, owner:auth.user.id})
      return response.status(201).send({pHost})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Display a single partyhost.
   * GET partyhosts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth }) {
    try {
      const party_host = await PartyHost.query().where('id',params.id).where('owner',auth.user.id).first()
      if(!party_host){
        return response.status(404).send({message:'Anfitrião não encotrado!'})
      }
      return response.status(201).send({party_host})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Update partyhost details.
   * PUT or PATCH partyhosts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response,auth }) {
    try {
      const data = request.all()
      const party_host = await PartyHost.query().where('id',params.id).where('owner',auth.user.id).first()
      if(!party_host){
        return response.status(404).send({message:'Anfitrião não encotrado!'})
      }
      party_host.merge({...data})
      await party_host.save()
      return response.status(201).send({party_host})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Delete a partyhost with id.
   * DELETE partyhosts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    try {
      const party_host = await PartyHost.query().where('id',params.id).where('owner',auth.user.id).first()
      if(!party_host){
        return response.status(404).send({message:'Anfitrião não encotrado!'})
      }

      await party_host.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }
}

module.exports = PartyHostController
