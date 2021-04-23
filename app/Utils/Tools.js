'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tools extends Model {
  async setUrl(galery, request){
    const imagesUrl = []
    await Promise.all(
      galery.rows.map(async photo=>{
        imagesUrl.push({
          path:`${request.protocol()}://${request.hostname()}:8080/v1/download/img/${photo.path}`,
          id:photo.id
          }
        )
      })
    )
    return imagesUrl
  }
}

module.exports = Tools
