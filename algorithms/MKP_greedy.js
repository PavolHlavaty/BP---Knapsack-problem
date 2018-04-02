// Approximate solution for Multiple Knapsack Problem using greedy alghoritm

function MKP_greedy (knapsacks, items) {
	// sort items in decreasing order of profit per unit weight
	items.sort((a, b) => (a.weight / a.profit) - (b.weight / b.profit));

	// sort knapsacks in increasing order of capacity
	knapsacks.sort((a, b) => a.capacity - b.capacity);

	let solution = 0;
	items.forEach(item => {
		for (let i = 0; i < knapsacks.length; i++) {
			if (item.weight < knapsacks[i].capacity) {
				item.knapsack = knapsacks[i].index;
				knapsacks[i].capacity -= item.weight;
				solution += item.profit;
				break;
			}
		}
	});

	return { solution: solution, items: items};
}
