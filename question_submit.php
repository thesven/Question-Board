<?php

require_once('./settings.php');

if(isset($_POST['first_name'], $_POST['last_name'], $_POST['email_address'], $_POST['question'])){
  
  $fname = mysql_real_escape_string($_POST['first_name']);
  $lname = mysql_real_escape_string($_POST['last_name']);
  $email = mysql_real_escape_string($_POST['email_address']);
  $question = mysql_real_escape_string($_POST['question']);
  
  $link = mysql_connect($settings['db']['host'], $settings['db']['user'], $settings['db']['pass']) or die("Could not connect: " . mysql_error());
  mysql_select_db($settings['db']['database'] ,$link) or die("Could no select DB: " . mysql_error());
  
  //check for duplicate questions
  $duplicate = false;
  $query = "SELECT * FROM questions ORDER BY id DESC";
  $result = mysql_query($query, $link);
  while($row = mysql_fetch_assoc($result)){
    if($row['question'] == $question){
      $duplicate = true;
    }
  }
  
  if(!$duplicate){
    
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

      //echo json_encode($response);
    } else {

      $response = array(
        'status' => 'unable to insert'
      );

      //echo json_encode($response);

    }
  } else {
    $response = array(
      'status' => 'duplicate question'
    );

    //echo json_encode($response);
  }
  
} else {
  
  $response = array(
    'status' => 'insufficient info'
  );
  
  //echo json_encode($response);
  
}

echo json_encode($response);