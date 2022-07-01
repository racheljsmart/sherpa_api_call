//Thoughts for data handling
// - param destructuring to only select the object properties I need



// test issn 1029-8479
//const issn = "1029-8479";

// Sherpa API endpoint
const endPoint = "https://v2.sherpa.ac.uk/cgi/retrieve";

//Sherpa API key for Florida State University
//register for a key at http://www.sherpa.ac.uk/romeo/apiregistry.php
const sherpaAPIkey = "E4D6B4AE-6CA4-11EC-89DC-08A26FA24E69";
//insert your API key inside the quotes

//Google scripts will timeout if you run the script too often. This delay function is designed to space out requests. Comment out if you're testing and only running small batches (less than 10 at a time).
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//IMPORTANT: this function retrieves the JSON data from Sherpa API 
async function getSherpaData(issn) {
  issn = fixissn(issn);
  try {
    await delay(5000);
    const response = await fetch(`${endPoint}?item-type=publication&format=Json&filter=[["issn","equals","${issn}"]]&api-key=${sherpaAPIkey}`);
    const sherpaData = await response.json();
    console.log(sherpaData);
    return sherpaData;
  } catch (e) {
    console.log('In Catch!', e);
  }
}


//This is a "Helper" function that is used to check the format of the issn that is passed into getSherpaData as an argument.
function fixissn(issn){
  console.log("Current issn " + issn);
  let mis;
  //if there's a dash in the issn, it needs 9 characters instead of 8
  if (issn.search("-") > -1) {
    mis = 9; 
  } else if (issn.search("-") == -1) {
    mis = 8; 
  }
  //if the ISSN is less than 9 or 8 (mis), add zeros to the beginning
  while (issn.length < mis && issn.length > 0) {
    //zero added to beginning of issn
    issn = 0 + issn
    console.log("fixed to new issn " + issn);
  }
  return issn;
}

// // checks if the issn is a journal that permits publisher pdf archiving
// function pubpdf(issn) {
//   const sherpaJson = getSherpaData(issn);

//   // is array empty? is the issn invalid?



// }