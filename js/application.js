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
  
  timestamp: null,
  
  update: function(){
    $.ajax({
      url: './question_render.php',
      type: 'POST',
      dataType: 'html',
      success: function(data, textStatus, jqXHR){
        $("#question-display").html(data);
      }
    });
  },
  
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
  
  /*var displayMode = url.getParameterByName('display');
  console.log('Display Mode: ' + displayMode);
  
  if(displayMode == 'large'){
    $("#question-submission").addClass('hide');
    $("#question-display").removeClass('span6').addClass('span12');
    window.setInterval(feed.update, 10000); //five seconds
  }*/
  
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