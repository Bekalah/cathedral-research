// BridgeCore.js - Unified Cathedral Bridge System
// Connects Codex 144:99 nodes, archetypes, sound, and art profiles

const codex = require('../data/codex_14499.json');

class BridgeCore {
  constructor() {
    this.nodes = codex;
  }

  getNode(id) {
    return this.nodes.find(n => n.id === id);
  }

  getBridges(id) {
    const node = this.getNode(id);
    return node ? node.bridge.map(bid => this.getNode(bid)) : [];
  }

  getSoundProfile(id) {
    const node = this.getNode(id);
    return node ? node.sound_profile : null;
  }

  getArtProfile(id) {
    const node = this.getNode(id);
    return node ? node.art_profile : null;
  }

  getArchetype(id) {
    const node = this.getNode(id);
    return node ? node.archetype : null;
  }

  getAllNodes() {
    return this.nodes;
  }
}

module.exports = new BridgeCore();
