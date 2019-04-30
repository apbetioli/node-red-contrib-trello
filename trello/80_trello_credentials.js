module.exports = function (RED) {

function TrelloNode (config) {
    RED.nodes.createNode(this, config)
    this.name = config.name
    this.apikey = config.apikey
    this.secret = config.secret
  }
  RED.nodes.registerType('trello-credentials', TrelloNode)
}
