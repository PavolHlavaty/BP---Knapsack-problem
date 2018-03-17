// import VIKP_dynamic_programming from './algorithms/VIKP_dynamic_programming';

$('form').submit((event) => {
	var items = [
		/*{weight:2,profit:2},
		{weight:2,profit:2},
		{weight:5,profit:3},
		{weight:2,profit:1},*/
		/*{weight:2,profit:5},
		{weight:2,profit:6},
		{weight:5,profit:10},
		{weight:5,profit:9},
		{weight:5,profit:9},
		{weight:5,profit:9},
		{weight:5,profit:9},
		{weight:4,profit:1},*/
		{weight:18,profit:78},
		{weight:18,profit:77},
		{weight:9,profit:35},
		{weight:9,profit:34},
		{weight:23,profit:89},
		{weight:23,profit:88},
		{weight:20,profit:36},
		{weight:20,profit:35},
		{weight:59,profit:94},
		{weight:59,profit:93},
		{weight:61,profit:75},
		{weight:61,profit:74},
		{weight:70,profit:74},
		{weight:70,profit:73},
		{weight:75,profit:79},
		{weight:75,profit:78},
		{weight:76,profit:80},
		{weight:76,profit:79},
		{weight:30,profit:16},
		{weight:30,profit:15},
		/*{weight:40,profit:10},
		{weight:41,profit:9},
		{weight:42,profit:8},
		{weight:43,profit:7},
		{weight:44,profit:6},
		{weight:45,profit:5},
		{weight:46,profit:4},
		{weight:47,profit:3},
		{weight:48,profit:2},
		{weight:49,profit:1},*/
	];
	var capacity = 100/*[80,90,100,110]/*[10,12,12]*//*[5,6]*/;
	switch ($('#knapsack_type').val()) {
	case '1':
		switch ($('#algorithm').val()) {
		case '1':
			var solution = VIKP_greedy(capacity, items);
			console.log(solution);
			break;
		case '2':
			var solution = VIKP_dynamic_programming(capacity, items);
			console.log(solution);
			break;
		case '3':
			var solution = VIKP_branch_and_bound(capacity, items);
			console.log(solution);
			break;
		}
		break;
	case '2':
		switch ($('#algorithm').val()) {
		/*case '1':
			var solution = VIKP_greedy(capacity, items);
			console.log(solution);
			break;
		case '2':
			var solution = VIKP_dynamic_programming(capacity, items);
			console.log(solution);
			break;*/
		case '3':
			var solution = MKP_bound_and_bound(capacity, items);
			console.log(solution);
			break;
		}
		break;
	default:
		break;
	}
	event.preventDefault();
});