var Trello = require('node-trello')

module.exports = function (RED) {
  function TrelloGetListNode (config) {
    RED.nodes.createNode(this, config)
    var node = this

    // Retrieve the config node
    var credentialNode = RED.nodes.getNode(config.trello)
    var trello = new Trello(credentialNode.apikey, credentialNode.secret)
    this.on('input', function (msg) {
      var trelloData = msg.trello || msg.payload || {}
      var listId = trelloData.idList || config.idList
      trello.get(
        '/1/lists/' + listId + '/cards',
        (err, data) => {
          if (err) { node.error(err) }
          node.send({ payload: data })
        }
      )
    })
  }
  RED.nodes.registerType('trello-get-list-cards', TrelloGetListNode)
}
