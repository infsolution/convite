'use strict'
const Present = use('App/Models/PresentLink')
const Party = use('App/Models/Party')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with presents
 */
class PresentController {
  /**
   * Show a list of all presents.
   * GET presents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const party_id = request.input('party_id')
      const party = await Party.query().where('id',party_id).where('owner', auth.user.id).first()
      if(!party){
        return response.status(404).send({message:'Festa não encontrada!'})
      }
      const presents = await party.presents().fetch()
      return response.send({presents})
    } catch (error) {
      return response.status(400).send(error.message)
    }
  }



  /**
   * Create/save a new present.
   * POST presents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response,auth }) {
    try {
      const data = request.all()
      const party = await Party.find(data.party_id)
      if(!party){
        return response.status(404).send({message:'Festa não encontrada!'})
      }
      const present = await Present.create({...data, party_id:party.id})
      return response.status(201).send({present})
    } catch (error) {
      return response.status(400).send(error.message)
    }
  }

  /**
   * Display a single present.
   * GET presents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth }) {
    try {
      const present = await Present.find(params.id)
      if(!present){
        return response.status(404).send({message: 'Presente não encontrado'})
      }
      const party = await Party.query().where('id', present.party_id).where('owner',auth.user.id).first()
      if(!party){
        return response.status(404).send({message:'Festa não encontrada!'})
      }
      return response.send({present})
    } catch (error) {
      return response.status(400).send(error.message)
    }
  }


  /**
   * Update present details.
   * PUT or PATCH presents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    try {
      const data = request.all()
      const present = await Present.find(params.id)
      if(!present){
        return response.status(404).send({message: 'Presente não encontrado'})
      }
      const party = await Party.query().where('id', present.party_id).where('owner',auth.user.id).first()
      if(!party){
        return response.status(404).send({message:'Festa não encontrada!'})
      }
      present.merege({...data})
      await present.save()
      return response.send({present})
    } catch (error) {
      return response.status(400).send(error.message)
    }
  }

  /**
   * Delete a present with id.
   * DELETE presents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    try {
      const present = await Present.find(params.id)
      if(!present){
        return response.status(404).send({message: 'Presente não encontrado'})
      }
      const party = await Party.query().where('id', present.party_id).where('owner',auth.user.id).first()
      if(!party){
        return response.status(404).send({message:'Festa não encontrada!'})
      }
      await present.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(400).send(error.message)
    }
  }
}

module.exports = PresentController
