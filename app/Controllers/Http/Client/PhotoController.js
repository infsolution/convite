'use strict'
const Photo = use('App/Models/Photo')
const Party = use('App/Models/Party')
const Helpers = use('Helpers')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with photos
 */
class PhotoController {
  /**
   * Show a list of all photos.
   * GET photos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    try {
      const party_id = request.input('party_id')
      if(!party_id){
        return response.status(404).send({message:'Dados inválidos'})
      }
      const party = await Party.find(party_id)
      if(!party){
        return response.status(404).send({message:'Festa não encontrada!'})
      }
      const photos = await Photo.query().where('party_id', party.id).fetch()
      return response.send({photos})
    } catch (error) {
      return response.status(400).send(error.message)
    }
  }



  /**
   * Create/save a new photo.
   * POST photos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const party_id = request.input('party_id')
      const party = await Party.find(party_id)
      if(!party){
        return response.status(404).send({message:'Festa não encontrada!'})
      }
      const photos = request.file('file',{
        size: '3mb'
      })
      if(photos){
        await photos.moveAll(Helpers.tmpPath('photos'), (file) =>{
          return{
            name: `${party.id}_${Date.now()}_${file.clientName.slice(-12)}`.toLowerCase().replace(" ","_")
          }
        })
        if(!photos.movedAll()){
          return photos.errors()
        }
        await Promise.all(
          photos.movedList().map(item=> Photo.create({party_id:party.id, path:item.fileName, owner:auth.user.id}))
        )
      }
      return response.send({message:'Image Saved!'})
    } catch (error) {
      console.log(error)
      return response.status(400).send(error.message)
    }
  }

  /**
   * Display a single photo.
   * GET photos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }


  /**
   * Update photo details.
   * PUT or PATCH photos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a photo with id.
   * DELETE photos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    try {
      const photo = await Photo.find(params.id)
      if(!photo){
        return response.status(404).send({message:'Foto não encontrada!'})
      }
      if(photo.owner != auth.user.id){
        return response.status(401).send({message:'Você não tem permissão para excluir essa foto!'})
      }
      await photo.delete()
      return response.status(204).send()

    } catch (error) {
      return response.status(400).send(error.message)
    }
  }
}

module.exports = PhotoController
