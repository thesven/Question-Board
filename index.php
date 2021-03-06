
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Presentation Questions</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href='http://fonts.googleapis.com/css?family=PT+Serif+Caption' rel='stylesheet' type='text/css'>
    <link href="./lib/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="./lib/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
    <link href="./css/style.css" rel="stylesheet">

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="../assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="../assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="../assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="../assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="../assets/ico/apple-touch-icon-57-precomposed.png">
  </head>

  <body>

    <div class="container">

      <div class="row">
        <div id="main-copy" class="span12">
          <div class="hero-unit">
            <h1>Question Board</h1>
            <hr/>
            <span class="hero-copy">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
          </div>
        </div>
        
        <div id="message-display" class="span12">
          
        </div>
        
        <div id="question-display" class="span6">
          
        </div>
        
        <div id="question-submission" class="span6">
          <div class="well">
            <h3>Please Submit a Question!</h3>
            <hr/>
            <form id="question-form" action="" method="post">
              <label for="first_name">First Name:</label><input type="text" name="first_name" value="" id="first_name">
              <label for="last_name">Last Name:</label><input type="text" name="last_name" value="" id="last_name">
              <label for="email_address">Email Address:</label><input type="text" name="email_address" value="" id="email_address">
              <label for="question">Question:</label><textarea id="question" name="question" rows="8" cols="40"></textarea>
              <div>
                <button type="submit" id="question-submit-btn" class="btn btn-large">Submit Question</button>
              </div>
            </form>
          </div>
        </div>
        
      </div>

    </div> <!-- /container -->

    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
    <script src="./js/lib/jquery-validation-1.9.0/jquery.validate.min.js"></script>
    <script src="./lib/bootstrap/js/bootstrap.min.js"></script>
    <script src="./js/application.js" type="text/javascript"></script>

  </body>
</html>
