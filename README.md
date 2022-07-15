# sherpa_api_call
Retrieves json data from the Sherpa API.


## File: sherpa_request.gs
This script is intended for use via Google Sheets.

### Instructions:
1. Register for an API key at https://v2.sherpa.ac.uk/cgi/register then insert the key in the "Sherpa API key" section of the code.
2. Perform an affiliation search in a large bibliographic database, such as Scopus or Web of Science. Include the ISSN metadata in the database export, since the function depends on the ISSN to work. Export this search to a .csv file.
3. Import the .csv into a Google Spreadsheet with at a minimum, columns for the following: ISSN, pubpdf, acceptedVerGet, and embargo.
4. CRITICAL: Select the ISSN column, select Format -> Number -> Plain Text. Or else the script won't work!
5. Set up the script, go to Extensions -> Apps Script
6. Copy and paste all the following into script editor window, and save.
7. Use the three functions described below in their corresponding columns. For example, in the cell of the first row of data, type =pubpdf() and with the curser in between the paraenthesis hold ctrl and click the cell with the ISSN. Press enter and the script will run. The result will either be text indicating whether or not the publisher's pdf can be used or an error. Check the execution logs to see where the error occurs.
8. To avoid excessive usage, after running a set of ISSNs, copy and paste over the discovered values by going to Edit -> Paste special -> Paste values only. This will prevent your sheet from crashing when you open it later. Without adjusting the values all the scripts would run again and you may need to start again with a different sheet.  

TIP: Beware of excessive use imposed by Google. Currently you are limited to 20,000 URL lookups per day. See https://docs.google.com/macros/dashboard for UrlFetch specifically.
