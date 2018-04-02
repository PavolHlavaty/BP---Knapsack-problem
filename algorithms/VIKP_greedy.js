// Value Independent Knapsack Problem solution using greedy alghoritm

function VIKP_greedy (capacity, items) {
	// sort items in decreasing order according to their weight
	items.sort((a, b) => b.weight - a.weight);

	// put items in knapsack 
	let cap = capacity;
	let solution = 0;
	for (var i = 0; i < items.length; i++) {
		if (items[i].weight < cap) {
			solution += items[i].weight;
			items[i].knapsack = 0;
			cap -= items[i].weight;
		} 
	}

	return { solution: solution, items: items };
}