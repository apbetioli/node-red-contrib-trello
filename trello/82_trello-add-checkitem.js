var Trello = require('node-trello')

module.exports = function (RED) {
  function TrelloAddCheckitemNode (config) {
    RED.nodes.createNode(this, config)
    var node = this

    // Retrieve the config node
    var credentialNode = RED.nodes.getNode(config.trello)
    var trello = new Trello(credentialNode.apikey, credentialNode.secret)
    this.on('input', function (msg) {
      var trelloData = msg.trello || msg.payload || {}
      var idChecklist = trelloData.idChecklist || config.idChecklist
      var sendData = {
        name: trelloData.name || config.name,
        pos: trelloData.pos || config.pos,
        checked: trelloData.checked || config.checked
      }
      trello.post(
        '/1/checklists/' + idChecklist + '/checkItems',
        sendData,
        (err, data) => {
          if (err) { node.error(err) }
          node.send({ payload: data })
        }
      )
    })
  }
  RED.nodes.registerType('trello-add-checkitem', TrelloAddCheckitemNode)
}
