var Trello = require('node-trello')

module.exports = function (RED) {
  function TrelloMoveCardToListNode (config) {
    RED.nodes.createNode(this, config)
    var node = this

    var credentialNode = RED.nodes.getNode(config.trello)
    var trello = new Trello(credentialNode.apikey, credentialNode.secret)
    this.on('input', function (msg) {
      var trelloData = msg.trello || msg.payload || {}
      var idList = trelloData.idList || config.idList
      var idCard = trelloData.idCard || config.idCard
      trello.put(
        '/1/cards/' + idCard + '/idList',
        {
          value: idList
        },
        (err, data) => {
          if (err) { node.error(err) }
          node.send({ 
            payload: {
              idList: idList,
              idCard, idCard,
              card: data
            }
          })
        }
      )
    })
  }
  RED.nodes.registerType('trello-move-card-to-list', TrelloMoveCardToListNode)
}
