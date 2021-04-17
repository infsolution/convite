'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tools extends Model {
  async setUrl(galery, request){
    const imagesUrl = []
    await Promise.all(
      galery.rows.map(async photo=>{
        imagesUrl.push(`${request.protocol()}://${request.hostname()}:3333/v1/download/img/${photo.path}`)
      })
    )
    return imagesUrl
  }
}

module.exports = Tools
