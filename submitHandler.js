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

function getLoadFromRemCap (knapsacks, rem_cap) {
	var knapsacks_load = [];
	knapsacks_load.length = knapsacks.length;
	knapsacks_load.fill(0);
	rem_cap.forEach(rem_capacity => {
		knapsacks_load[rem_capacity.index] = knapsacks[rem_capacity.index].capacity - rem_capacity.capacity;
	});
	return knapsacks_load;
}

async function solve (items_files, knapsacks_file) {
	var solution;
	var t1;
	var t2;
	var knapsacks, knapsacks_copy;
	var solutions = [];
	const getLoad = () => {
		solution.knapsacks_load = [];
		solution.knapsacks_load.length = knapsacks.length;
		solution.knapsacks_load.fill(0);
		solution.items.forEach(item => {
			if (item.knapsack != -1) {
				solution.knapsacks_load[item.knapsack] += item.weight;
			}
		});
		let total_cap = 0;
		let total_load = 0;
		for (let i = 0; i < knapsacks.length; i++) {
			total_cap += knapsacks_copy[i].capacity;
			total_load += solution.knapsacks_load[i];
		}
		solution.load = (total_load / total_cap) * 100;
	};
	//for (let i = 0; i < items_files.length; i++) {
	//	var result = await readFile(items_files[i]);
	var result = await readFile(items_files[0]);
	var items = getItems(result);
	switch ($('#knapsack_type').val()) {
	case '1':
		var capacity = Number($('#capacity').val());
		var capacity_copy = Number($('#capacity').val());

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
		solution.load = (solution.solution / capacity_copy) * 100;
		break;
	case '2':
		result = await readFile(knapsacks_file);
		knapsacks = getKnapsacks(result);
		knapsacks_copy = getKnapsacks(result);

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
			solution = MKP_branch_and_bound(knapsacks, items, Number($('#backtracks').val()));
			t2 = performance.now();
			solution.time = t2 - t1;
			for (let i = 0; i < items.length; i++) {
				if (solution.items[i] !== -1)
					items[i].knapsack = knapsacks[solution.items[i]].index;
				solution.items[i] = items[i];
			}
			solution.items.sort((a, b) => a.index - b.index);
			break;
		}
		getLoad();
		solution.knapsacks_capacity = knapsacks_copy;
		break;
	case '3':
		result = await readFile(knapsacks_file);
		knapsacks = getKnapsacks(result);
		knapsacks_copy = getKnapsacks(result);

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
			solution.time_1 = solution.t2 - t1;
			/*solution.time_2 = solution.t3 - solution.t2;
			solution.time_3 = t2 - solution.t3;*/
			solution.time_2 = t2 - solution.t2;
			solution.time = t2 - t1; 
			solution.knapsacks_load_1 = getLoadFromRemCap(knapsacks_copy, solution.rem_capacity_1);
			//solution.knapsacks_load_2 = getLoadFromRemCap(knapsacks_copy, solution.rem_capacity_2);
			solution.solutio_1 = 0;
			//solution.solutio_2 = 0;
			for (let i = 0; i < knapsacks.length; i++) {
				solution.solutio_1 += solution.knapsacks_load_1[i];
				//solution.solutio_2 += solution.knapsacks_load_2[i];
			}
			solution.items.forEach(item => {
				if (item.knapsack.index !== undefined)
					item.knapsack = item.knapsack.index;
				delete(item.next);
				delete(item.new_knap);
			});
			delete(solution.t2);
			delete(solution.t3);
			delete(solution.rem_capacity_1);
			//delete(solution.rem_capacity_2);
			break;
		case '3':
			t1 = performance.now();
			solution = VIMKP_branch_and_bound(knapsacks, items, Number($('#backtracks').val()));
			t2 = performance.now();
			solution.time = t2 - t1;
			for (let i = 0; i < items.length; i++) {
				if (solution.items[i] !== -1)
					items[i].knapsack = knapsacks[solution.items[i]].index;
				solution.items[i] = items[i];
			}
			solution.items.sort((a, b) => a.index - b.index);
			break;
		}
		getLoad();
		solution.knapsacks_capacity = knapsacks_copy;
		break;
	default:
		break;
	}
	return solution;
	//solutions.push(solution);
	//}
	//return solutions;
}

function loadChart(myCallback) {
	google.charts.load('current', {packages:['corechart']});
	google.charts.setOnLoadCallback(myCallback);
}

function drawChart(elementId, load, capacity, index) {
	var data = google.visualization.arrayToDataTable([
		['Title', 'Number'],
		['Loaded', load],
		['Free', capacity - load],
	]);

	var options = {
		pieSliceText: 'value',
		sliceVisibilityThreshold: 0.0000001,
		title: 'Knapsack: ' + index + ' Capacity: ' + capacity,
		tooltip: {
			//showColorCode: true,
			//text: 'value',
			trigger: 'selection'
		},
		pieHole: 0.4,
	};

	var chart = new google.visualization.PieChart(document.getElementById(elementId));
	chart.draw(data, options);
}

$('form').submit((event) => {
	solve(event.target[2].files, event.target[3].files[0]).then(solution => {
		$('#solution_div').css('display','block');

		console.log(solution);
		$('#profit').html(solution.solution);
		$('#load').html(solution.load + '%');
		$('#time').html(solution.time);

		const knap_visual_div = $('#knap_visual');
		knap_visual_div.empty();
		if ($('#knapsack_type').val() === '1') { // VIKP
			knap_visual_div.append($('<div/>').attr({id: 'donut', class: 'chart'}));

			loadChart(function () {
				drawChart('donut', solution.solution, Number($('#capacity').val()), 0);
			});
		} else {
			for (let i = 0; i < solution.knapsacks_load.length; i++) {
				let elementId = 'donut_' + i;
				knap_visual_div.append($('<div/>').attr({id: elementId, class: 'chart'}));

				loadChart(function () {
					drawChart(elementId, solution.knapsacks_load[i], solution.knapsacks_capacity[i].capacity, i);
				});
			}
		}
		const table_body = $('#items_table tbody');
		table_body.empty();
		for (let i = 0; i < solution.items.length; i++){
			if ($('#knapsack_type').val() !== '2') solution.items[i].profit = solution.items[i].weight;
			let new_row = 
			`<tr>
				<th scope="row">${i+1}</th>
				<td>${solution.items[i].weight}</td>
				<td>${solution.items[i].profit}</td>
				<td>${solution.items[i].knapsack}</td>
		 	</tr>`;
			table_body.append(new_row);
			
		}
		

	});
		
	event.preventDefault();
});