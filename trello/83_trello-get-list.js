var Trello = require('node-trello')

module.exports = function (RED) {
  function TrelloGetListNode (config) {
    RED.nodes.createNode(this, config)
    var node = this

    var credentialNode = RED.nodes.getNode(config.trello)
    var trello = new Trello(credentialNode.apikey, credentialNode.secret)
    this.on('input', function (msg) {
      var trelloData = msg.trello || msg.payload || {}
      var listId = trelloData.idList || config.idList
      trello.get(
        '/1/lists/' + listId,
        (err, data) => {
          if (err) { node.error(err) }
          node.send({ 
            payload: Object.assign(msg.payload, data)
          })
        }
      )
    })
  }
  RED.nodes.registerType('trello-get-list', TrelloGetListNode)
}
