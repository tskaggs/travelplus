var landing_name;

var observer = new MutationSummary({
  callback: handleKayakChanges,
  queries: [{ element: '.filterSubHeader' }]
});

function handleKayakChanges(summaries) {
	// console.log('Changeeeee!!! FUCK!!!');
	var hTweetSummary = summaries[0];
	hTweetSummary.added.forEach(function(newEl) {
		if ($('#location_information').length == 0) {
			find_location_kayak();
		}
	});
}

find_location_kayak();
/**END Kayak**/