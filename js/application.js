$(function(){
  
  $('#question-submit-btn').click(function(){
    
    console.log('submit click');
    
    var fname = $('#first_name').val();
    var lname = $('#last_name').val();
    var email = $('#email_address').val();
    var question = $('#question').val();
    
    console.log(fname + ' ' + lname + ' ' + email + ' ' + question);
    
    $.ajax({
      data: {
        first_name: fname,
        last_name: lname,
        email_address: email,
        question: question
      },
      url: 'http://localhost:8082/OAO-Questions-Form/question_submit.php',
      type: 'POST',
      dataType: 'json',
      success: function(data, textStatus, jqXHR){
        var toPrepend = '<div class="asked-question well"><div class="question-text">' + data.info.question + '</div><hr/><div class="submit-details"><div class="submit-name">' + data.info.lname + ', ' + data.info.fname + '</div></div></div>';
        $("#question-display").prepend(toPrepend);
      }, 
      error: function(jqXHR, textStatus, errorThrown){
        console.log(errorThrown);
        console.log(textStatus);
      }
    });
    
  });
  
});