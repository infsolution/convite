'use strict'
const Party = use('App/Models/Party')
const User = use('App/Models/User')
const Helpers = use('Helpers')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with parties
 */
class PartyController {
  /**
   * Show a list of all parties.
   * GET parties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      const parties = await Party.query().where('owner',auth.user.id).fetch()
      return response.send({parties})

    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }


  /**
   * Create/save a new party.
   * POST parties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.all()
      const party = await Party.create({...data, owner:auth.user.id})
      const photo = request.file('file',{
        types: ['image'],
        size: '3mb'
      })
      if(photo){
        await photo.move(Helpers.tmpPath('photos'),{
          //name: `${Date.now()}_${file.clientName.slice(-12)}`.toLowerCase().replace(" ","_"),
          name: `${Date.now()}_${photo.clientName.slice(-12)}`.toLocaleLowerCase().replace(/ /g, "_"),
          overwrite: true
        })
        if(!photo.moved()){
          return photo.errors()
        }
        console.log(photo)
        party.invite_path_image = photo.fileName
        await party.save()
      }
      return response.status(201).send({party})
    } catch (error) {
      console.log(error)
      return response.status(400).send({error:error.message})
    }

  }

  /**
   * Display a single party.
   * GET parties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth }) {
    try {
      const party = await Party.query().where('id', params.id)
      .where('owner', auth.user.id)
      .with('address')
      .with('partyHost')
      .with('inviteds')
      .first()
      return response.send({party})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Update party details.
   * PUT or PATCH parties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    try {
      const data = request.all()
      const party = await Party.query().where('id', params.id)
      .where('owner', auth.user.id).first()
      party.merge({...data})
      await party.save()
      return response.send({party})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }

  /**
   * Delete a party with id.
   * DELETE parties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    try {
      const party = await Party.query().where('id', params.id)
      .where('owner', auth.user.id).first()
      await party.delete()
      return response.status(204).send({})
    } catch (error) {
      return response.status(400).send({error:error.message})
    }
  }
}

module.exports = PartyController
