var Trello = require('node-trello')

module.exports = function (RED) {
  function TrelloCreateChecklist (config) {
    RED.nodes.createNode(this, config)
    var node = this

    var credentialNode = RED.nodes.getNode(config.trello)
    var trello = new Trello(credentialNode.apikey, credentialNode.secret)
    this.on('input', function (msg) {
      var trelloData = msg.trello || msg.payload || {}
      var name = trelloData.name || config.name
      var idCard = trelloData.idCard || config.idCard
      trello.post(
        '/1/cards/' + idCard + '/checklists',
        {
          name: name
        },
        (err, data) => {
          if (err) { node.error(err) }
          node.send({ 
            payload: Object.assign(msg.payload, {
              idCard: idCard,
              idChecklist: data.id,
              checklist: data
            })
          })
        }
      )
    })
  }
  RED.nodes.registerType('trello-create-checklist', TrelloCreateChecklist)
}
