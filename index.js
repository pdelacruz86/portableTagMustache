//using mustache for file templating 
var Mustache = require('mustache');
//read file 
var fs = require("fs");
//devlopment utilities
var _ = require("lodash");
//program utilities
var utils =  require('./utils/util.js')
//module created to interact with aws s3 buckets
var S3 = require('./utils/S3.js')
// using promises to convert sync operations in async operations
var Promise = require('bluebird')

// utility function
function getFileAsync(filepath) {
    return fs.readFileAsync(filepath);
}

//adding promise to fs
Promise.promisifyAll(fs);

/**
 *
 * function to compile the tag and replace templates parameters
 *
 * @params contains a list of parameter passed to the lambda expressions by querystring
 */

function compileTag(params, callback) {
  var templateFile = "portable.tmpl.js"
  var celtraTagTemplateFile = "celtratag.html"

  //promise function to get the tag html from aws 3 bucket
  S3.getHtmlTagAsync(celtraTagTemplateFile).then(function(data){
    //string representation of the buffer
    var source = data.Body.toString();

    /**
      TODO:
      - replace the variable from the celtra tag and add mustache brackets to replaces the variable with the querystring parameters
      // <!-- externalCreativeId  = raw       ${CREATIVE_ID} -->
      // <!-- externalPlacementId = raw       ${TAG_ID} -->
      // <!-- externalSiteId      = raw       ${SITE_ID} -->
      // <!-- externalSiteName    = urldecode ${REFERER_URL_ENC} -->
      // <!-- externalSupplierId  = raw       ${PUBLISHER_ID} -->
      // <!-- externalCampaignId  = raw       ${CP_ID} -->
     **/

    source = _.replace(source, '${CLICK_URL}', '{{clickUrl}}')
    source = _.replace(source, '${CREATIVE_ID}', '{{externalCreativeId}}')
    source = _.replace(source, '${TAG_ID}', '{{externalPlacementID}}')
    source = _.replace(source, '${SITE_ID}', '{{externalSiteID}}')
    source = _.replace(source, '${REFERER_URL_ENC}', '{{externalSiteName}}')
    source = _.replace(source, '${PUBLISHER_ID}', '{{externalSupplierId}}')
    source = _.replace(source, '${CP_ID}', '{{externalCampaignId}}')

    // call the render function
    var outputString = Mustache.render(source, params);
    //add the result to the param object
    params.htmlString = utils.escapeJavascript(outputString);

  }).then(function(){
    //after getting the html use a new promisse to create the js File replacing all parameters from params
    getFileAsync(templateFile).then(function (js){
      // make the buffer into a string
      var source = js.toString();

      // call the render function
      var outputString = Mustache.render(source, params);
      //return a callback with the output string
      return callback(null, outputString);
  });
  })
}

/**
 *
 * aws Lambda main function
 *
 * @event contains all the pathParameters and queryString Parameters passed by the API gateway
 */
exports.handler = function handler(event, context, callback) {
  //path parameters comming into the function
  var userName = _.get(event, "pathParameters.userName", false);
  var fileName = _.get(event, "pathParameters.fileName", false);
  var clickUrl = _.get(event, "queryStringParameters.clickUrl", false);
  var externalCreativeId = _.get(event, "queryStringParameters.externalCreativeId", false);
  var externalPlacementID = _.get(event, "queryStringParameters.externalPlacementID", false);
  var externalSiteID = _.get(event, "queryStringParameters.externalSiteID", false);
  var externalSiteName = _.get(event, "queryStringParameters.externalSiteName", false);
  var externalSupplierId = _.get(event, "queryStringParameters.externalSupplierId", false);
  var externalCampaignId = _.get(event, "queryStringParameters.externalCampaignId", false);
  
  //data object
  var data = {
      userName: userName,
      fileName: fileName,
      clickUrl: clickUrl,
      externalCreativeId: externalCreativeId,
      externalPlacementID: externalPlacementID,
      externalSiteID: externalSiteID,
      externalSiteName: externalSiteName,
      externalSupplierId: externalSupplierId,
      externalCampaignId: externalCampaignId,
      htmlString: ''
  };

//compile the tag
compileTag(data, function(err, result) {
    if (err) {
      return callback("Unknown Error");
    }
    var response = {
      statusCode: 200,
      body: result,
      headers: {
        "Content-Type": "application/javascript"
      }
    };

    return callback(null, response);
  });

}

/**
 *
 * Function create to test the function in nodejs
 *
 */

// exports.handler(
//   {
//     pathParameters: { 
//       userName: 'User1',
//       fileName: "testname.html"
//     },
//     queryStringParameters: {
//       clickUrl: 'www.test.com', 
//       externalCreativeId : 69146847, 
//       externalPlacementID :11282894,
//       externalSiteID: 2924258,
//       externalSiteName: 'www.padsquad2.com',
//       externalSupplierId: 100240,
//       externalCampaignId: '${CP_ID}'
//     }
//   }, 
//   null, 
//  (err, response) => { 
//     var dir = './tmp';

//     if (!fs.existsSync(dir)){
//         fs.mkdirSync(dir);
//     }

//     fs.writeFile("./tmp/testfile.js",  response.body, function(err) {
//       if(err) {
//         return console.log(err);
//       }

//       console.log("The file was saved!");
//     }); 
//   }
// );


//aws test object
// {
//   "pathParameters": { 
//     "userName": "User1",
//     "fileName": "testname.html", 
//   },
//   "queryStringParameters": {
//     "externalCreativeId" : 69146847, 
//     "externalPlacementID" :11282894,
//     "externalSiteID": 2924258,
//     "externalSiteName": "www.padsquad2.com",
//     "externalSupplierId": 100240,
//     "externalCampaignId": "${CP_ID}"
//   }
// }

