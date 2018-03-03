var globalVars = {unloaded:false};

$(document).ready(function() {
$('#content').load('workouts.html');
});


function dateNow() {
   return new Date().getTime();
}

function loadHtml(filename) {
   $('#content').load(filename);
}
