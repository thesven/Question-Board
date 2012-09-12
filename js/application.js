var formHandler = {
  
  submit: function(){
    
    var fname = $('#first_name').val();
    var lname = $('#last_name').val();
    var email = $('#email_address').val();
    var question = $('#question').val();
    
    $.ajax({
      data: {
        first_name: fname,
        last_name: lname,
        email_address: email,
        question: question
      },
      url: './question_submit.php',
      type: 'POST',
      dataType: 'json',
      success: function(data, textStatus, jqXHR){
        
        console.log(data.status);
        
        switch(data.status){
          case "success":

            $("#question-form").find(":input").each(function(){
              $(this).val('');
            });

            feed.update();
            
            break;
          case "unable to insert":
            break;
          case "insufficient info":
            break;
        }
        
      }
    });
    
  }
  
};

var feed = {
  
  update: function(){
    $.ajax({
      url: './question_render.php',
      type: 'POST',
      dataType: 'html',
      success: function(data, textStatus, jqXHR){
        $("#question-display").html(data);
      }
    });
  }
  
};

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(function(){
  
  var displayMode = getParameterByName('display');
  console.log('Display Mode: ' + displayMode);
  
  if(displayMode == 'large'){
    $("#question-submission").addClass('hide');
    $("#question-display").removeClass('span6').addClass('span12');
    window.setInterval(feed.update, 10000); //five seconds
  }
  
  $("#question-form").validate({
		rules: {
			first_name:{
				required: true
			},
			last_name: {
				required: true
			},
			email_address: {
				required: true,
				email: true
			},
			question: {
				required: true
			}
		},
		messages: {
			first_name:{
				required: 'Your First Name is required'
			},
			last_name: {
				required: 'Your Last Name is required'
			},
			email_address: {
				required: 'Your Email Address is required',
				email: 'Please Enter a valid email address'
			},
			question: {
				required: 'Please Enter A Question'
			}
		},
		errorClass: "error",
		onkeyup: false,
		onfocusout: false,
		onclick: false,
		submitHandler: function(form){
			formHandler.submit();
			return false;
		}
	});
  
});