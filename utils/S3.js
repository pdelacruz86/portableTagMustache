  /* eslint-disable */

  module.exports = (function(){
    // Import the listObjects function
    var AWS = require('aws-sdk');
    // Use bluebird implementation of Promise
    AWS.config.setPromisesDependency(require('bluebird'));

    //assign the bucket name
    var tagBucketName = 'alltags'
    //add credentials
    var creds = new AWS.Credentials({
      accessKeyId: 'AKIAJPCAYL7ROX3HX7YA', secretAccessKey: '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', sessionToken: null
    });
    //set up AWS
    AWS.config.update({
      region: 'us-east-1',
      credentials: creds
    })

    //setup the bucket
    var bucket = new AWS.S3({
      params: {
        Bucket: tagBucketName
      }
    });

    /**
     *
     * get the tag from aws s3 bucket using async
     *
     * @filename the name of the file in the bucket
     */
    
    function getHtmlTagAsync(filename) {
      var key = 'user1/' + filename;
      var params = {
        Key: key
      }
      var getObjectPromise = bucket.getObject(params).promise();
      return getObjectPromise;
    }

    /**
     *
     * get the tag from aws s3 bucket using async
     *
     */
    function getHtmlTag(filename, callback) {
      var key = 'user1/' + filename;

      var params = {
        Key: key
      }

      bucket.getObject(params, callback);
    }

    /**
     *
     * Module public functions
     *
     */
    
    return {
      getHtmlTag : function(filename, callback){
        return getHtmlTag(filename, callback)
      },
      getHtmlTagAsync : function(filename){
        return getHtmlTagAsync(filename)
      }
    }
  })()