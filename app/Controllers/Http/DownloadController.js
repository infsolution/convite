'use strict'

class DownloadController {
  async img({params, response}){
    return response.download(`tmp/photos/${params.name}`)
}
}

module.exports = DownloadController
