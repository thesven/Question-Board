<?php

  $link = mysql_connect('127.0.0.1:33066', 'drupaluser', '') or die("Could not connect: " . mysql_error());
  mysql_select_db('oao-questions' ,$link) or die("Could no select DB: " . mysql_error());
  
  $query = "SELECT * FROM questions ORDER BY id DESC";
  $result = mysql_query($query, $link);
  
  while($row = mysql_fetch_assoc($result)){
    echo '<div class="asked-question well"><div class="question-text">' . $row['question'] . '</div><hr/><div class="submit-details"><div class="submit-name">' . $row['last_name'] . ', ' . $row['first_name'] . '</div></div></div>';;
  }
  
  mysql_close($link);