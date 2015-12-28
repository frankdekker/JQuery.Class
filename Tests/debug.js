

var debugClass = function(klass) {

	for(var key in klass) {
		console.log("- key: " + key + ": " + $.type(klass[key]));
	}
};