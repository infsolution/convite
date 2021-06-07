'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tools extends Model {
  async setUrl(galery, request){
    const imagesUrl = []
    await Promise.all(
      galery.rows.map(async photo=>{
        imagesUrl.push({
          path:`${request.protocol()}://${request.hostname()}/v1/download/img/${photo.path}`,
          id:photo.id
          }
        )
      })
    )
    return imagesUrl
  }

  async compareDateHour({date, hour, interval}){
   try {
    const date_now = new Date()
    if(date_now.getUTCFullYear() == date.getUTCFullYear() &&
    date_now.getUTCMonth() == date.getUTCMonth() &&
    date_now.getUTCDate() == date.getUTCDate() &&
    date_now.getUTCHours()+interval >= parseInt(hour.slice(0,2))
    ){
      return true
    }
    return false
   } catch (error) {
    return false
   }

  }
}

module.exports = Tools
