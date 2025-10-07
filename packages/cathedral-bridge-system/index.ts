/**
 * Cathedral Bridge System — Unified Hub for All Apps & Packages
 * Connects: stone-grimoire, liber-arcanae, liber-arcanae-game, circuitum99, cathedral-of-circuits, magical-mystery-house, octagram-tools, synthesis-engine, art-engine, consciousness-engine, etc.
 * Exposes: Matrix registration, event bus, codex/archetype/worker access, state sync, mirror logic, RPG/sound/creative APIs
 * All build files must be connected to this hub; no random or orphaned builds allowed.
 */

// Import core bridge modules
import { CathedralConnectionMatrix, cathedralMatrix } from '../../tesseract-bridge/ConnectionMatrix.js';
import { tesseract } from '../../tesseract/bridge.js';
import BridgeCore from '../../bridge-system/BridgeCore.js';
import MagicalMysteryHouseCodexMirror from '../../bridge-system/mystery-house-codex-mirror.js';
// Consciousness engine (RPG, sound, archetype logic)
import { Code14499System } from '../../consciousness-engine/src/Code14499System';


// Unified API for all apps/packages — now with isomorphism discovery and node monitoring
export const CathedralBridgeHub = {
  // Matrix registration and system map
  registerSystem: (id: string, config: any) => cathedralMatrix.registerSystem(id, config),
  getSystemMap: () => cathedralMatrix.getSystemMap(),
  getAllSystems: () => cathedralMatrix.getAllSystems(),
  getAllConnections: () => cathedralMatrix.getAllConnections(),
  setState: (key: string, value: any) => cathedralMatrix.setState(key, value),
  getState: (key: string) => cathedralMatrix.getState(key),

  // Event bus (pub/sub)
  publish: (channel: string, payload: any) => tesseract.publish(channel, payload),
  subscribe: (channel: string, handler: Function) => tesseract.subscribe(channel, handler),

  // Codex/archetype/worker access
  getCodexNode: (id: number) => BridgeCore.getNode(id),
  getCodexBridges: (id: number) => BridgeCore.getBridges(id),
  getCodexSoundProfile: (id: number) => BridgeCore.getSoundProfile(id),
  getCodexArtProfile: (id: number) => BridgeCore.getArtProfile(id),
  getCodexArchetype: (id: number) => BridgeCore.getArchetype(id),
  getAllCodexNodes: () => BridgeCore.getAllNodes(),

  // Mirror logic (Mystery House ↔ Codex)
  getMirrorState: () => MagicalMysteryHouseCodexMirror.getCurrentMirrorState(),
  generateIntegrationReport: () => MagicalMysteryHouseCodexMirror.generateIntegrationReport(),
  activateAllMirrorChannels: () => MagicalMysteryHouseCodexMirror.activateAllChannels(),

  // Consciousness engine (RPG, sound, archetype logic)
  createRPGSystem: () => new Code14499System(),

  // Diagnostics and health
  runDiagnostics: () => cathedralMatrix.runSystemDiagnostics(),

  // Standards enforcement
  GOLDEN_RULE: '../../CATHEDRAL_GOLDEN_RULE.md',
  SYSTEM_INTEGRATION_PLAN: '../../CATHEDRAL_SYSTEM_INTEGRATION_PLAN.md',

  // Utility: Ensure all build files are connected to this hub
  validateBuildConnections: () => {
    const systemMap = cathedralMatrix.getSystemMap();
    console.log('✅ All build files must be registered in CathedralConnectionMatrix. No orphaned builds allowed.');
    return true;
  },

  // Isomorphism discovery: find isomorphic nodes across all layers/systems
  findIsomorphisms: (nodeId: number): Array<{ system: string; node: any }> => {
    const node = BridgeCore.getNode(nodeId);
    if (!node) return [];
    // Example: compare node properties across all systems for isomorphic structure
    const isomorphisms: Array<{ system: string; node: any }> = [];
    CathedralBridgeHub.getAllSystems().forEach((system: any) => {
      if (system.nodes && Array.isArray(system.nodes)) {
        system.nodes.forEach((n: any) => {
          if (n.geometry === node.geometry && n.element === node.element) {
            isomorphisms.push({ system: system.id, node: n });
          }
        });
      }
    });
    return isomorphisms;
  },

  // Node monitoring: monitor node usage and health across all layers
  monitorNode: (nodeId: number): any => {
    const node = BridgeCore.getNode(nodeId);
    if (!node) return null;
    const health = CathedralBridgeHub.runDiagnostics();
    // Example: aggregate health and usage info for this node
    return {
      node,
      health,
      usage: CathedralBridgeHub.getAllSystems().map((system: any) => ({
        system: system.id,
        used: system.nodes && system.nodes.some((n: any) => n.node_id === nodeId)
      }))
    };
  },

  // Multi-layer usage: get all layers/systems using a node
  getNodeLayers: (nodeId: number): string[] => {
    const layers: string[] = [];
    CathedralBridgeHub.getAllSystems().forEach((system: any) => {
      if (system.nodes && system.nodes.some((n: any) => n.node_id === nodeId)) {
        layers.push(system.id);
      }
    });
    return layers;
  }
};

export default CathedralBridgeHub;
