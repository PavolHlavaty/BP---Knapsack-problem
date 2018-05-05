// Greedy alghoritm to solve Value Independent Multiple Knapsack Problem

function VIMKP_greedy (knapsacks, items) {
	// sort items in decreasing order according to their weight
	items.sort((a, b) => b.weight - a.weight);

	// sort knapsacks in increasing order of capacity
	knapsacks.sort((a, b) => a.capacity - b.capacity);

	let solution = 0;
	items.forEach(item => {
		for (let i = 0; i < knapsacks.length; i++) {
			if (item.weight < knapsacks[i].capacity) {
				item.knapsack = knapsacks[i].index;
				knapsacks[i].capacity -= item.weight;
				solution += item.weight;
				break;
			}
		}
	});

	return { solution: solution, items: items};
}
