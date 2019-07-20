'use strict'
exports.handler = (event, context, callback) => {

  // Extract the request from the CloudFront event that is sent to Lambda@Edge
  const request = event.Records[0].cf.request;

  // Extract the URI from the request
  const oriUri = request.uri;

  // Match any '/' that occurs at the end of a URI.
  if (oriUri.endsWith('/')) {
    // Replace it with a default index.html
    request.uri += 'index.html';
  } else if (!oriUri.includes('.')) {
    request.uri += 'index.html';
  }

  // Return to CloudFront
  callback(null, request);
}