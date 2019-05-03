var Trello = require('node-trello')

module.exports = function (RED) {
  function TrelloDeleteCard (config) {
    RED.nodes.createNode(this, config)
    var node = this

    var credentialNode = RED.nodes.getNode(config.trello)
    var trello = new Trello(credentialNode.apikey, credentialNode.secret)
    this.on('input', function (msg) {
      var trelloData = msg.trello || msg.payload || {}
      var idCard = trelloData.idCard || config.idCard
      trello.del(
        '/1/cards/' + idCard,
        {},
        (err, data) => {
          if (err) { node.error(err) }
          node.send({ 
            payload: Object.assign(msg.payload, {
              card: data 
            })
          })
        }
      )
    })
  }
  RED.nodes.registerType('trello-delete-card', TrelloDeleteCard)
}
