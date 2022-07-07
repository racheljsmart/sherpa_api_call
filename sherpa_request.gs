//Function: this is the main function that checks if the ISSN is a journal which permits publisher PDF archiving
function pubpdf(issn) {  
  //var issn = "2198-1833";
  //var issn = "1029-8479";
  var text = getSherpaData(issn);
   // checks to see if the issn is invalid
  //var failText=text.search("<outcome>failed</outcome>");
  //var notfound=text.search("<outcome>notFound</outcome>");
  // checks to see if the issn is missing
  if (issn == 00000000 || issn == 0000-0000 || issn == "") { 
    return ("blank ISSN")
  } else if (text.items.length == 0){
    return ("ISSN invalid") }
  else {  
  return permPdfGet(text);
  }
}

//IMPORTANT: this function retrieves the JSON data from Sherpa API
function getSherpaData(issn) {
  issn = fixIssn(issn);
  
  //Google scripts will timeout if you run the script too often. These sleep actions are designed to space out your commands. Comment out the next 6 lines if you're testing and only running small batches (less than 10 at a time).
   var randnumber = Math.random()*5000;
   Utilities.sleep(randnumber); 
   Utilities.sleep(randnumber); 
   Utilities.sleep(randnumber); 
   Utilities.sleep(randnumber); 
   Utilities.sleep(randnumber); 
  
  // Sherpa API endpoint
  var endPoint = "https://v2.sherpa.ac.uk/cgi/retrieve";

  //Sherpa API key for Florida State University
  //register for a key at http://www.sherpa.ac.uk/romeo/apiregistry.php
  var sherpaAPIkey = "E4D6B4AE-6CA4-11EC-89DC-08A26FA24E69";
  //insert your API key inside the quotes
  var url = endPoint + '?item-type=publication&api-key=' + sherpaAPIkey + '&format=Json&filter=' + encodeURIComponent('[["issn","equals","') + issn + encodeURIComponent('"]]');

  var response = UrlFetchApp.fetch(url);
  Logger.log(response);
  var json = response.getContentText();
  var data = JSON.parse(json);
  Logger.log(data);
  return data;
}

function fixIssn(issn) {
  Logger.log("Old issn " + issn);
  //if there's a dash in the ISSN, it need 9 characters instead of 8
  if (issn.search("-") > -1) {
   var mis = 9; 
  } else if (issn.search("-") == -1) {
   var mis = 8; 
  }
  //if the ISSN is less than 9 or 8 (mis), add zeros to the beginning
  while (issn.length < mis && issn.length > 0) {
    //zero added to beginning of ISSN
    issn = 0 + issn
    }
  Logger.log("fixed to new issn " + issn);
  return issn;
}

function permPdfGet(txt) {
  var permPub = txt.items[0].publisher_policy[0].permitted_oa[0];
  //checks for 'published'
  if (permPub.hasOwnProperty("article_version")) {
    var articleVer = permPub.article_version;
    if (articleVer.includes("published")) {
      var permTxt = "Publisher PDF permitted";
    }
    } else {
    var permTxt = "No publisher PDF";
    }
    Logger.log(permTxt);
  return permTxt;
}
