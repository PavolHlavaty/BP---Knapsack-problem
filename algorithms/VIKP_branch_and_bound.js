// Value Independent Knapsack Problem solution using branch & bound algorithm

function VIKP_branch_and_bound (capacity, items) {
	// compute bounds
	const bounds = [];
	bounds[items.length - 1] = items[items.length - 1].weight;
	for (let i = items.length - 2; i >= 0; i--) {
		bounds[i] = bounds[i+1] + items[i].weight;
	}

	// create array to store tree nodes and insert first dummy node
	const tree_stack = [];
	tree_stack.push({
		level: -1,
		weight: 0,
		indexes: [],
	});

	let solution = 0;
	let solutionIndexes = [];
	while (tree_stack.length > 0) {
		let actualNode = tree_stack.pop();
		if (actualNode.level === items.length - 1) continue;

		// construct child node without next item
		var newNodeOut = {
			level: actualNode.level + 1,
			weight: actualNode.weight,
			indexes: Array.from(actualNode.indexes),
		};
		if (newNodeOut.weight + bounds[newNodeOut.level + 1] > solution)
			tree_stack.push(newNodeOut);

		// construct child node with next item
		var newNodeIn = {
			level: actualNode.level + 1,
			weight: actualNode.weight + items[actualNode.level + 1].weight,
			indexes: Array.from(actualNode.indexes),
		};
		newNodeIn.indexes.push(actualNode.level + 1); 

		if (newNodeIn.weight <= capacity && newNodeIn.weight > solution){
			solution = newNodeIn.weight;
			solutionIndexes = Array.from(newNodeIn.indexes);
			if (solution === capacity) return { solution: solution, indexes: solutionIndexes };
		}

		if ((newNodeIn.weight < capacity) && (newNodeIn.weight + bounds[newNodeIn.level + 1] > solution))
			tree_stack.push(newNodeIn);
	}

	return { solution: solution, indexes: solutionIndexes };
}