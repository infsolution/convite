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
      const invited = await Invited.create({...data})
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
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing invited.
   * GET inviteds/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
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
  }

  /**
   * Delete a invited with id.
   * DELETE inviteds/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = InvitedController
