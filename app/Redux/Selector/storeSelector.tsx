export const StoreSelector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  addNode: state.addNode,
  removeNode: state.removeNode,
  onEdgesDelete: state.onEdgesDelete,
  removeEdgesByNodeId: state.removeEdgesByNodeId,
  addValue: state.addValue,
  deleteValue: state.deleteValue,
  updateValue: state.updateValue,
  updateValueDep: state.updateValueDep,
  updateValueResposta: state.updateValueResposta,
  updateFormValues: state.updateFormValues,
  getFormById: state.getFormById,
});
