var Trello = require('node-trello')

module.exports = function (RED) {
  function TrelloMoveCardPositionOnListNode (config) {
    RED.nodes.createNode(this, config)
    var node = this

    var credentialNode = RED.nodes.getNode(config.trello)
    var trello = new Trello(credentialNode.apikey, credentialNode.secret)
    this.on('input', function (msg) {
      var trelloData = msg.trello || msg.payload || {}
      var pos = trelloData.pos || config.pos
      var idCard = trelloData.idCard || config.idCard
      trello.put(
        '/1/cards/' + idCard + '/pos',
        {
          value: pos
        },
        (err, data) => {
          if (err) { node.error(err) }
          node.send({ 
            payload: Object.assign(msg.payload, {
              idCard, idCard,
              card: data
            })
          })
        }
      )
    })
  }
  RED.nodes.registerType('trello-move-position-on-list', TrelloMoveCardPositionOnListNode)
}
