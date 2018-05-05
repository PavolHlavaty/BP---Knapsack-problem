// Branch and bound algorithm to solve Multiple Knapsack Problem 

function MKP_branch_and_bound (knapsacks, items, max_backtracks) {
	// sort items in decreasing order of profit per unit weight
	items.sort((a, b) => (a.weight / a.profit) - (b.weight / b.profit));

	// sort knapsacks in increasing order of capacity
	knapsacks.sort((a, b) => a.capacity - b.capacity);

	// call mtm alghoritm 
	return MTM(knapsacks, items, max_backtracks);
}