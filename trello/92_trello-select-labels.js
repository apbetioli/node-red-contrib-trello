module.exports = function (RED) {
  function TrelloSelectLabelsNode (config) {
    RED.nodes.createNode(this, config)
    console.log(config)
    this.name = config.name
    this.idBoard = config.idBoard
    this.labels = config.labels

    var node = this;

    this.on('input', function (msg) {
      
      msg.payload = Object.assign(msg.payload, {
        "idBoard": node.idBoard,
        "idLabels": node.labels
      });

      node.send(msg);
    });
  }
  RED.nodes.registerType('trello-select-labels', TrelloSelectLabelsNode)
}
