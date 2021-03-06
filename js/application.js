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
            console.log('success entering data into db');
            
            $("#question-form").find(":input").each(function(){
              $(this).val('');
            });
            
            $("#message-display").html('<div class="alert alert-success fade in"><button type="button" class="close" data-dismiss="alert">×</button><strong>Thank You!</strong> for submitting your question</div>');
            
            break;
          case "unable to insert":
            $("#message-display").html('<div class="alert alert-error fade in"><button type="button" class="close" data-dismiss="alert">×</button><strong>Sorry!</strong> We were unable to save your question</div>');
            break;
          case "insufficient info":
            $("#message-display").html('<div class="alert alert-error fade in"><button type="button" class="close" data-dismiss="alert">×</button><strong>Sorry!</strong> There was not enough information supplied</div>');
            break;
          case "duplicate question":
            $("#message-display").html('<div class="alert alert-error fade in"><button type="button" class="close" data-dismiss="alert">×</button><strong>Sorry!</strong> That question has already been asked</div>');
            break;
        }
        
      }
    });
    
  }
  
};

var feed = {
  
  timestamp: null,
  
  longpoll: function(){
    
    var pollURL = './get_question_data.php?timestamp=' + feed.timestamp;
    console.log('starting longpoll: ' + pollURL);
    
    $.ajax({
      type: 'GET',
      url: pollURL,
      async: true,
      cache: false,
      success: function(data){
        var json = eval('(' + data + ')');
        
        if(json['data'] != ''){
          $("#question-display").html(json['data']);
        }
        feed.timestamp = json['timestamp'];
        setTimeout('feed.longpoll()', 1000);
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log('error performing longpoll');
        setTimeout('feed.longpoll()', 15000);
      }
    });
    
  }
  
};

var url = {
  
  getParameterByName: function(name){
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if(results == null)
      return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  
};

$(function(){
  
  var displayMode = url.getParameterByName('display');
  console.log('Display Mode: ' + displayMode);
  
  if(displayMode == 'large'){
    $("#question-submission").addClass('hide');
    $("#question-display").removeClass('span6').addClass('span12');
  }
  
  feed.longpoll();
  
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