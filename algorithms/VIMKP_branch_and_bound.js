// Branch and bound algorithm to solve Value Independent Mulitple Knpasack Problem

function VIMKP_branch_and_bound (knapsacks, items, max_backtracks) {
	// sort items in decreasing order according to their weight
	items.sort((a, b) => b.weight - a.weight);

	// sort knapsacks in increasing order of capacity
	knapsacks.sort((a, b) => a.capacity - b.capacity);

	items.forEach(item => {
		item.profit = item.weight;
	});

	// call mtm alghoritm 
	return MTM(knapsacks, items, max_backtracks);
}