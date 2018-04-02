// Quick Forward Lookup algorithm for Value Independent Multiple Knapsack Problem

/*function restoreOrder (knapsacks_ll) {
	let cur_knap = knapsacks_ll;
	while (cur_knap.next !== undefined && knapsacks_ll.capacity < cur_knap.next.capacity){
		cur_knap = cur_knap.next;
	}
	if (cur_knap !== knapsacks_ll) {
		var first = knapsacks_ll.next;
		knapsacks_ll.next = cur_knap.next;
		cur_knap.next = knapsacks_ll;
		knapsacks_ll = first;
	}
	return knapsacks_ll;
}*/

/*function restoreOrder (knapsack, prev_knap) {
	let cur_knap = knapsack;
	while (cur_knap.next !== undefined && knapsack.capacity < cur_knap.next.capacity){
		cur_knap = cur_knap.next;
	}
	if (cur_knap !== knapsack) {
		var temp = knapsack.next;
		knapsack.next = cur_knap.next;
		cur_knap.next = knapsack;
		if (prev_knap) prev_knap.next = temp;
		else knapsack = temp;
	}
	return knapsack;
}*/

function restoreOrder (knapsack) {
	let cur_knap = knapsack;
	if (knapsack.next && knapsack.capacity < knapsack.next.capacity) {
		while (cur_knap.next && knapsack.capacity < cur_knap.next.capacity) {
			cur_knap = cur_knap.next;
		}
		var temp = knapsack.next;
		var tmp = knapsack.prev;
		//knapsack.next.prev = knapsack.prev;
		knapsack.next = cur_knap.next;
		if (cur_knap.next) cur_knap.next.prev = knapsack;
		knapsack.prev = cur_knap;
		cur_knap.next = knapsack;
		temp.prev = tmp;
		if (tmp) {
			tmp.next = temp;
			return undefined;
		}
		else {
			knapsack = temp;
			return knapsack;
		}


		//old 
		/*var temp = knapsack.next;
		knapsack.next = cur_knap.next;
		cur_knap.next = knapsack;
		if (knapsack.prev) {
			knapsack.prev.next = temp;
			temp.prev = knapsack.prev;
		}
		else {
			knapsack = temp;
			knapsack.prev = undefined;
		}
		knapsack.prev = cur_knap;
		if (knapsack.next) knapsack.next.prev = knapsack;*/

	} else if (knapsack.prev && knapsack.capacity > knapsack.prev.capacity) {
		while (cur_knap.prev && knapsack.capacity > cur_knap.prev.capacity) {
			cur_knap = cur_knap.prev;
		}
		knapsack.prev.next = knapsack.next;
		if (knapsack.next) knapsack.next.prev = knapsack.prev;
		knapsack.next = cur_knap;
		temp = cur_knap;
		if (cur_knap.prev) {
			knapsack.prev = cur_knap.prev;
			cur_knap.prev.next = knapsack;
			temp.prev = knapsack;
			return undefined;
		}
		else {
			knapsack.prev = undefined;
			cur_knap = knapsack;
			temp.prev = knapsack;
			return knapsack;
		}
		
	}
	
	return undefined;
}

function insertItem (knapsack, item) {
	if (knapsack.items_ll === undefined || item.weight < knapsack.items_ll.weight) {
		item.next = knapsack.items_ll;
		knapsack.items_ll = item;
	} else {
		let cur_item = knapsack.items_ll;
		while (cur_item.next !== undefined && item.weight > cur_item.next.weight) {
			cur_item = cur_item.next;
		}
		item.next = cur_item.next;
		cur_item.next = item;
	}
	return knapsack;
}

function VIMKP_QFL (knapsacks, items) {
	let solution = 0;
	/*for (let i = 0; i < knapsacks.length; i++)
		knapsacks.items = [];*/

	// sort knapsacks in decreasing order of capacity
	knapsacks.sort((a, b) => b.capacity - a.capacity);

	// create linked list
	for (let i = 0; i < knapsacks.length - 1; i++) {
		knapsacks[i].next = knapsacks[i+1];
		knapsacks[i+1].prev = knapsacks[i];
	}
	knapsacks[knapsacks.length - 1].next = undefined;
	var knapsacks_ll = knapsacks[0];

	// insert items to knapsacks
	items.forEach(item => { 
		if (item.weight <= knapsacks_ll.capacity) {
			knapsacks_ll = insertItem(knapsacks_ll, item);
			item.knapsack = knapsacks_ll;
			knapsacks_ll.capacity -= item.weight;
			solution += item.weight;
			// restore sorted order
			
			let first = restoreOrder(knapsacks_ll);
			if (first) knapsacks_ll = first;
			/*for (let i = 1; i < knapsacks.length; i++) {
				if (knapsacks[i-1].capacity < knapsacks[i].capacity) {
					// swap
					let temp = knapsacks[i];
					knapsacks[i] = knapsacks[i-1];
					knapsacks[i-1] = temp;
				} else break;
			}*/
			return;
		}
		let cur_knap = knapsacks_ll;
		let prev_knap;
		while (cur_knap) {
			let cur_item = cur_knap.items_ll;
			let prev_item;
			while (cur_item !== undefined && cur_item.weight + cur_knap.capacity < item.weight) {
				prev_item = cur_item;
				cur_item = cur_item.next;
			}
			/*if (cur_item === undefined) {
				cur_knap = cur_knap.next;
				continue;
			}*/
			if (cur_item) {
				if (cur_knap === knapsacks_ll) {
					if (knapsacks_ll.next !== undefined && cur_item.weight <= knapsacks_ll.next.capacity) {
						// remove item
						if (prev_item) prev_item.next = cur_item.next;
						else cur_knap.items_ll = cur_item.next;
						// put item to other knapsack
						knapsacks_ll.next = insertItem(knapsacks_ll.next, cur_item);
						cur_item.knapsack = knapsacks_ll.next;
						knapsacks_ll.next.capacity -= cur_item.weight;
						/*knapsacks_ll.next =*/ restoreOrder(knapsacks_ll.next);
						// insert new item
						cur_knap = insertItem(cur_knap, item);
						item.knapsack = cur_knap;
						cur_knap.capacity -= item.weight;
						cur_knap.capacity += cur_item.weight;
						solution += item.weight;
						let first = restoreOrder(knapsacks_ll);
						if (first) knapsacks_ll = first;
						return;
					}
				}
				else if (cur_item.weight <= knapsacks_ll.capacity){
					// remove item
					if (prev_item) prev_item.next = cur_item.next;
					else cur_knap.items_ll = cur_item.next;
					cur_knap.capacity += cur_item.weight;
					// insert new item
					cur_knap = insertItem(cur_knap, item);
					item.knapsack = cur_knap;
					cur_knap.capacity -= item.weight;
					solution += item.weight;
					/*cur_knap = */restoreOrder(cur_knap);
					// put item to other knapsack
					knapsacks_ll = insertItem(knapsacks_ll, cur_item);
					cur_item.knapsack = knapsacks_ll;
					knapsacks_ll.capacity -= cur_item.weight;
					let first = restoreOrder(knapsacks_ll);
					if (first) knapsacks_ll = first;
					return;
				}
			}
			prev_knap = cur_knap;
			cur_knap = cur_knap.next;
		}
		
		
		cur_knap = knapsacks_ll;
		prev_knap = undefined;
		while (cur_knap) {
			let command_list = [];
			knapsacks.forEach(knapsack => {
				knapsack.new_capacity = knapsack.capacity;
			});
			let cur_knap_target = knapsacks_ll;
			while (cur_knap_target) {
				if (cur_knap.index === cur_knap_target.index) {
					cur_knap_target = cur_knap_target.next;
					continue;
				}
				let cur_item = cur_knap.items_ll;
				let good_item;
				let prev_item;
				if (cur_item && cur_item.weight <= cur_knap_target.new_capacity) {
					good_item = cur_item.new_knap ? undefined : cur_item;
					while (cur_item.next && cur_item.next.weight <= cur_knap_target.new_capacity) {
						if (cur_item.next.new_knap === undefined) {
							prev_item = cur_item;
							good_item = cur_item.next;
						}
						cur_item = cur_item.next;
					}
					if (good_item) {
						good_item.new_knap = cur_knap_target;
						command_list.push(good_item);
						cur_knap_target.new_capacity -= good_item.weight;
						cur_knap.new_capacity += good_item.weight;
						if (item.weight <= cur_knap.new_capacity) {
							// execute commands
							command_list.forEach(item_to_move => {
								// remove item
								if (prev_item) prev_item.next = item_to_move.next;
								else item_to_move.knapsack.items_ll = item_to_move.next;
								// put item to other knapsack
								item_to_move.new_knap = insertItem(item_to_move.new_knap, item_to_move);
								item_to_move.knapsack = item_to_move.new_knap;
								item_to_move.new_knap.new_capacity = undefined;
								item_to_move.new_knap = undefined;
								item_to_move.knapsack.capacity -= item_to_move.weight;
								let first = restoreOrder(item_to_move.knapsack);
								if (first) knapsacks_ll = first;
								/*if (item_to_move.knapsack === knapsacks_ll) knapsacks_ll = restoreOrder(item_to_move.knapsack);
								else restoreOrder(item_to_move.knapsack);*/
							});
							// insert new item
							cur_knap = insertItem(cur_knap, item);
							item.knapsack = cur_knap;
							solution += item.weight;
							cur_knap.capacity = cur_knap.new_capacity - item.weight;
							let first = restoreOrder(cur_knap);
							if (first) knapsacks_ll = first;
							return;
						}
					}
				}
				cur_knap_target = good_item ? cur_knap_target : cur_knap_target.next;
			}
			// restore unused
			command_list.forEach(item_to_move => {
				item_to_move.new_knap = undefined;
			});

			cur_knap = cur_knap.next;
		}

		/*for (let i = 0; i < knapsacks.length; i++) {
			if (item.weight <= knapsacks[i].capacity) {
				// assign item to knapsack
				item.knapsack = i;
				knapsacks[i].items.push(item);
				knapsacks[i].capacity -= item.weight;
				solution += item.weight;
				return; // go to next item
			}
		}
		for (let i = 0; i < knapsacks.length; i++) {
			for (let j = 0; j < knapsacks[i].items.length; j++){
				if (knapsacks[i].capacity + knapsacks[i].items[j].weight >= item.weight) {
					for (let k = 0; k < knapsacks.length; k++){
						if (i === k) continue;
						if (knapsacks[i].items[j].weight <= knapsacks[k].capacity) {
							// reassign item
							knapsacks[k].items.push(knapsacks[i].items[j]);
							knapsacks[i].items[j].knapsack = k;
							knapsacks[k].capacity -= knapsacks[i].items[j].weight;
							// remove item
							knapsacks[i].capacity += knapsacks[i].items[j].weight;
							knapsacks[i].items.splice(j, 1);
							// assign new item
							item.knapsack = i;
							knapsacks[i].items.push(item);
							knapsacks[i].capacity -= item.weight;
							solution += item.weight;
							return; // go to next item
						}
					}
				}
			}
		}*/
		
	});
	return { solution: solution, items: items};
}