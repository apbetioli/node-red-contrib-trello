module.exports = function (RED) {
  function TrelloSelectListNode (config) {
    RED.nodes.createNode(this, config)
    this.name = config.name
    this.idBoard = config.idBoard
    this.idList = config.idList

    var node = this;

    this.on('input', function (msg) {
      
      msg.payload = Object.assign(msg.payload, {
        "idBoard": node.idBoard,
        "idList": node.idList
      });

      node.send(msg);
    });
  }
  RED.nodes.registerType('trello-select-list', TrelloSelectListNode)
}
