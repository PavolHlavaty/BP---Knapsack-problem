// import VIKP_dynamic_programming from './algorithms/VIKP_dynamic_programming';

$('form').submit((event) => {
	var items = [{weight:3,b:10},{weight:10,b:3},{weight:4,b:9},{weight:5,b:5},{weight:8,b:6}];
	var capacity = 12;
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
    
	default:
		break;
	}
	event.preventDefault();
});