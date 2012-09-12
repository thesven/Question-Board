<?php

if(isset($_POST['first_name'], $_POST['last_name'], $_POST['email_address'], $_POST['question'])){
  
  $fname = $_POST['first_name'];
  $lname = $_POST['last_name'];
  $email = $_POST['email_address'];
  $question = $_POST['question'];
  
  $link = mysql_connect('127.0.0.1:33066', 'drupaluser', '') or die("Could not connect: " . mysql_error());
  mysql_select_db('oao-questions' ,$link) or die("Could no select DB: " . mysql_error());
  
  $query = "INSERT INTO questions (first_name, last_name, email_address, question) VALUES ('{$fname}', '{$lname}', '{$email}', '{$question}')";
  
  if(mysql_query($query, $link)){
    $response = array(
      'status' => 'success'
    );
    
    mysql_close($link);
    
    //write info to the file
    $cache_new = '<div class="asked-question well"><div class="question-text">' . $question . '</div><hr/><div class="submit-details"><div class="submit-name">' . $lname . ', ' . $fname . '</div></div></div>'; // this gets prepended
    $file = "question_data.txt"; // the file to which $cache_new gets prepended

    $handle = fopen($file, "r+");
    $len = strlen($cache_new);
    $final_len = filesize($file) + $len;
    $cache_old = fread($handle, $len);
    rewind($handle);
    $i = 1;
    while (ftell($handle) < $final_len) {
      fwrite($handle, $cache_new);
      $cache_new = $cache_old;
      $cache_old = fread($handle, $len);
      fseek($handle, $i * $len);
      $i++;
    }
    //end write info the the file
    
    echo json_encode($response);
  } else {
    
    $response = array(
      'status' => 'unable to insert'
    );

    echo json_encode($response);
    
  }
  
} else {
  
  $response = array(
    'status' => 'insufficient info'
  );
  
  echo json_encode($response);
  
}