$(function(){
  
  var displayMode = getParameterByName('display');
  console.log('Display Mode: ' + displayMode);
  
  if(displayMode == 'large'){
    $("#question-submission").addClass('hide');
    $("#question-display").removeClass('span6').addClass('span12');
    window.setInterval(updateFeed, 5000); //five seconds
  }
  
  $('#question-submit-btn').click(function(){
    
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
        var toPrepend = '<div class="asked-question well"><div class="question-text">' + data.info.question + '</div><hr/><div class="submit-details"><div class="submit-name">' + data.info.lname + ', ' + data.info.fname + '</div></div></div>';
        $("#question-display").prepend(toPrepend);
      }
    });
    
  });
  
});

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

function updateFeed(){
  $.ajax({
    url: './question_render.php',
    type: 'POST',
    dataType: 'html',
    success: function(data, textStatus, jqXHR){
      $("#question-display").html(data);
    }
  });
}