var globalVars = {unloaded:false};

$(document).ready(function() {
   loadHtml('workouts.html');
});


function dateNow() {
   return new Date().getTime();
}

function loadHtml(filename) {
   $('#content').load(filename);
}
