function getItems (text) {
	var rows = text.split('\n');
	var items = [];
	for (let i = 0; i < rows.length - 1; i++){
		var values = rows[i].split(',');
		items.push({
			weight: Number(values[0]),
			profit: Number(values[1]),
			index: i,
			knapsack: -1,
		});
	}
	return items;
}

function getKnapsacks (text) {
	var rows = text.split('\n');
	var knapsacks = [];
	for (let i = 0; i < rows.length - 1; i++){
		knapsacks.push({
			capacity: Number(rows[i]),
			index: i,
		});
	}
	return knapsacks;
}

function readFile (file) {
	return new Promise(function(resolve, reject){
		var reader = new FileReader();
		reader.onload = function() {
			resolve(reader.result);
		};
		reader.onerror = function(err) {
			console.error('Failed to read file');
			reject(err);
		};
		reader.readAsText(file);
	});
}

async function solve (items_file, knapsacks_file) {
	var solution;
	var t1;
	var t2;
	var knapsacks;
	var result = await readFile(items_file);
	var items = getItems(result);
	switch ($('#knapsack_type').val()) {
	case '1':
		var capacity = Number($('#capacity').val());

		switch ($('#algorithm').val()) {
		case '1':
			t1 = performance.now();
			solution = VIKP_greedy(capacity, items);
			t2 = performance.now();
			solution.time = t2 - t1;
			solution.items.sort((a, b) => a.index - b.index);
			break;
		case '2':
			t1 = performance.now();
			solution = VIKP_dynamic_programming(capacity, items);
			t2 = performance.now();
			solution.time = t2 - t1;
			break;
		case '3':
			t1 = performance.now();
			var output = VIKP_branch_and_bound(capacity, items);
			t2 = performance.now();
			for (let i = 0; i < output.indexes.length; i++) {
				items[output.indexes[i]].knapsack = 0;
			}
			solution = {
				solution: output.solution,
				items: items,
				time: t2 - t1,
			};
			break;
		}
		break;
	case '2':
		result = await readFile(knapsacks_file);
		knapsacks = getKnapsacks(result);

		switch ($('#algorithm').val()) {
		case '1':
			t1 = performance.now();
			solution = MKP_greedy(knapsacks, items);
			t2 = performance.now();
			solution.time = t2 - t1;
			solution.items.sort((a, b) => a.index - b.index);
			break;
		case '2':
			t1 = performance.now();
			solution = MKP_branch_and_bound(knapsacks, items, $('#backtracks').val());
			t2 = performance.now();
			solution.time = t2 - t1;
			for (let i = 0; i < items.length; i++) {
				items[i].knapsack = solution.items[i];
				solution.items[i] = items[i];
			}
			solution.items.sort((a, b) => a.index - b.index);
			break;
		}
		break;
	case '3':
		result = await readFile(knapsacks_file);
		knapsacks = getKnapsacks(result);

		switch ($('#algorithm').val()) {
		case '1':
			t1 = performance.now();
			solution = VIMKP_greedy(knapsacks, items);
			t2 = performance.now();
			solution.time = t2 - t1;
			solution.items.sort((a, b) => a.index - b.index);
			break;
		case '2':
			t1 = performance.now();
			solution = VIMKP_QFL(knapsacks, items);
			t2 = performance.now();
			solution.time = t2 - t1;
			solution.items.forEach(item => {
				if (item.knapsack.index)
					item.knapsack = item.knapsack.index;
				delete(item.next);
				delete(item.new_knap);
			});
			break;
		case '3':
			t1 = performance.now();
			solution = VIMKP_branch_and_bound(knapsacks, items, $('#backtracks').val());
			t2 = performance.now();
			solution.time = t2 - t1;
			for (let i = 0; i < items.length; i++) {
				items[i].knapsack = solution.items[i];
				solution.items[i] = items[i];
			}
			solution.items.sort((a, b) => a.index - b.index);
			break;
		}
		break;
	default:
		break;
	}
	return solution;
}

$('form').submit((event) => {
	solve(event.target[2].files[0], event.target[3].files[0]).then(solution => console.log(solution));
	event.preventDefault();
});