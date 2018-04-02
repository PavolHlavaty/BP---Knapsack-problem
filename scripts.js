//helper function to write name of the file to file select field 
$('input[type=file]').change(function () {
	var fieldVal = $(this).val();
  
	// Change the node's value by removing the fake path (Chrome)
	fieldVal = fieldVal.replace('C:\\fakepath\\', '');
      
	if (fieldVal != undefined || fieldVal != '') {
		$(this).next('.custom-file-label').attr('data-content', fieldVal);
		$(this).next('.custom-file-label').text(fieldVal);
	}
  
});

function should_display_backtracks() {
	var knap = $('#knapsack_type').val();
	var alg = $('#algorithm').val();
	if ((knap === '2' && alg === '2') || (knap === '3' && alg === '3'))
		$('#backtracks_div').css('display','block');
	else 
		$('#backtracks_div').css('display','none');
}

$('#knapsack_type').change(() => {
	should_display_backtracks();

	var alg_select = $('#algorithm');
	switch ($('#knapsack_type').val()) {
	case '1':
		alg_select.empty();
		alg_select.append($('<option/>').val('1').text('Greedy')); 
		alg_select.append($('<option/>').val('2').text('Dynamic programming'));
		alg_select.append($('<option/>').val('3').text('Branch & Bound')); 

		$('#capacity_div').css('display','block');
		$('#knapsacks_div').css('display','none');
		break;
	case '2':
		alg_select.empty();
		alg_select.append($('<option/>').val('1').text('Greedy')); 
		alg_select.append($('<option/>').val('2').text('Branch & Bound'));

		$('#capacity_div').css('display','none');
		$('#knapsacks_div').css('display','block');
		break;
	case '3':
		alg_select.empty();
		alg_select.append($('<option/>').val('1').text('Greedy')); 
		alg_select.append($('<option/>').val('2').text('QFL'));
		alg_select.append($('<option/>').val('3').text('Branch & Bound')); 

		$('#capacity_div').css('display','none');
		$('#knapsacks_div').css('display','block');
		break;
	}
	
});

$('#algorithm').change(() => {
	should_display_backtracks();
});