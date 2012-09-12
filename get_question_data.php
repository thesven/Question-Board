<?php
  
  $file = dirname(__FILE__).'/question_data.txt';
  $lastmodif = isset($_GET['timestamp']) ? $_GET['timestamp'] : 0;
  $currentmodif = filemtime($file);
  
  while($currentmodif <= $lastmodif){
    usleep(10000);
    clearstatcache();
    $currentmodif = filemtime($file);
  }
  
  $response = array();
  $response['data'] = file_get_contents($file);
  $response['timestamp'] = $currentmodif;
  
  echo json_encode($response);
  
  