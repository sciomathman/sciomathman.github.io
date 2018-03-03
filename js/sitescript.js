$(document).ready(function() {

$(window).bind('beforeunload', function(){
    globalVars.unloaded = true;
});

jQuery('button.submitbutton').on('click', function(e)
	{
		processSubmitRequest();
		e.preventDefault();		
        $('#overlay1').show();
	});

// footer Ajax magic
	function processSubmitRequest(code)
	{
		//var serialized = jQuery('.form-container form').serializeArray();
		//var obj = jQuery('.form-container form').serializeJSON();
        
		var invalidcode = -1;
   		
		var sname = document.getElementById("sname").value;
		var smobileno = document.getElementById("smobileno").value;
		var semail = document.getElementById("semail").value;
		var scourse = $( "#scoursecategory option:selected" ).text();
		var scourseval = $( "#scoursecategory option:selected" ).val();

		
		if(sname.length <= 3){
			invalidcode = 1;
		} else if (!(/^\d{10}$/.test(smobileno))){
			 invalidcode = 2;
		} else if (!semail.includes("@") || !semail.includes(".")){
			 invalidcode=3;
		} else if (scourseval == ""){
			 invalidcode =4;
		}

     if(invalidcode == -1){

		jQuery.ajax(
		{
			type: 'POST',
			url: 'http://www.bharatinstituteofelevators.com/ajax/submitform.php',
			//data: 'code=' + code,
			data: {student_name:sname,student_mobileno:smobileno,student_email:semail,student_selection:scourse},
            dataType: 'json',
            async:true,   //you may use jsonp for cross origin request
            crossDomain:true,
			success: function(response)
			{
				
				jQuery('.submitmsg').text(response);
				
				console.log(response);
				//console.log(serialized);
			},
		error: function(xhr, status, error) {
  			if (globalVars.unloaded) return;
			if(status == "timeout"|| (status == "error" && xhr.responseText == "" && error == "")){
			return;			
			}else{
			
			jQuery('.submitmsg').text(xhr.responseText + "/" + status + "/" + error);
				
  			//alert(xhr.responseText + "/" + status + "/" + error);
			}
			}
		})
.done(function(data){
    console.log("Successfully fetched data.");
	jQuery('.submitmsg').text("Successfully fetched data");
resetform();
$('#overlay1').fadeOut(5000); 
})
.fail(function(data){
    console.log("Error in fetching data");
	//alert("Check your Connection status or try again later");
	jQuery('.submitmsg').text("Check your Connection status or try again later");
resetform();
$('#overlay1').fadeOut(5000); 
});

	} else{  //error checking
		switch (invalidcode) {
    case 1:
        jQuery('.submitmsg').text("Pls enter proper name");

        break;
    case 2:
        jQuery('.submitmsg').text("Pls enter valid mobile number");
        break;
    case 3:
        jQuery('.submitmsg').text("Pls enter valid email address");
        break;
    case 4:
        jQuery('.submitmsg').text("Pls select proper qualification");
        break;
    
	}
window.setTimeout(function() {
    $('#overlay1').fadeOut(1000); 
  }, 1000);

	}

}


	// footer Send button
	jQuery('button.ajaxcontact').on('click', function(e)
	{
		processRequest();
		e.preventDefault();
        $('#overlay2').show();
	});
	
	//footer Form toggle
	jQuery('.contact-link').click(function(e)
	{
		jQuery('#contact-link-show').slideToggle();
		jQuery('#contact-form').slideToggle();
		
		e.preventDefault();
	});
	
	// footer Ajax magic
	function processRequest(code)
	{
		//var serialized = jQuery('.form-container form').serializeArray();
		//var obj = jQuery('.form-container form').serializeJSON();
        
		
		var fname = document.getElementsByName("fname")[0].value;
		var femail = document.getElementsByName("femail")[0].value;
		var fcomments = document.getElementsByName("fcomments")[0].value;
		
		jQuery.ajax(
		{
			type: 'POST',
			url: 'http://www.bharatinstituteofelevators.com/ajax/test4.php',
			//data: 'code=' + code,
			data: {your_name:fname,email:femail,comments:fcomments},
            dataType: 'json',
            async:true,   //you may use jsonp for cross origin request
            crossDomain:true,
			success: function(response)
			{
				
				jQuery('.footermsg').text(response);
				
				console.log(response);
				//console.log(serialized);
			},
		error: function(xhr, status, error) {
  			if (globalVars.unloaded) return;
			if(status == "timeout"|| (status == "error" && xhr.responseText == "" && error == "")){
			return;			
			}else{
			
			jQuery('.footermsg').text(xhr.responseText + "/" + status + "/" + error);
				
  			//alert(xhr.responseText + "/" + status + "/" + error);
			}
			}
		})
.done(function(data){
    console.log("Successfully fetched data.");
	jQuery('.footermsg').text("Successfully fetched data");
$('#overlay2').fadeOut(5000); 
})
.fail(function(data){
    console.log("Error in fetching data");
	//alert("Check your Connection status or try again later");
	jQuery('.footermsg').text("Check your Connection status or try again later");
$('#overlay2').fadeOut(5000); 
});



	}


function resetform() {
document.getElementById("sname").value ="";
document.getElementById("smobileno").value ="";
document.getElementById("semail").value = "";
document.getElementById("scoursecategory").options[0].selected="selected";
}


//footer serializearray to json
function getFormData(unindexed_array){    
    var indexed_array = {};
    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

}); //document ready
