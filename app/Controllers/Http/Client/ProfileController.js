'use strict'
const Hash = use('Hash')
const User = use('App/Models/User')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with profiles
 */
class ProfileController {
  /**
   * Show a list of all profiles.
   * GET profiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    try {
      return response.send({profile:auth.user})
    } catch (error) {
      return response.status(400).send({message:error.message})
    }
  }


  /**
   * Create/save a new profile.
   * POST profiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single profile.
   * GET profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, auth }) {
    try {
      return response.send({profile:auth.user})
    } catch (error) {
      return response.status(400).send({message:error.message})
    }
  }


  /**
   * Update profile details.
   * PUT or PATCH profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    try {
      const data = request.all()
      const user = await User.find(auth.user.id)
      user.merge({...data})
      await user.save()
      return response.send({user})
    } catch (error) {
      return response.status(400).send({message:error.message})
    }
  }

  /**
   * Delete a profile with id.
   * DELETE profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ProfileController
