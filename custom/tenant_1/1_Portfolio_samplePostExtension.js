const portfolioService = require('../../bin/portfolioService');

function execute_post_query_extension(appContext,queryName,params,data)
{
  console.log('I AM IN POST QUERY EXTENSION......LOLOLPORTFOLIO*'+JSON.stringify(data)+'*');
  try {

    console.log('data', data);
    console.log('client', client);

  } catch(err) {
    console.log('execute_post_submit_extension', err);
  }
  return data;
}

function execute_post_submit_extension(appContext,client,documentName,data)
{
  console.log('I AM IN POST SUBMIT  EXTENSION......LOLOLPORTFOLIO'+ documentName);
  try {

    if(documentName === 'Portfolio')
      portfolioService.processPostExt(appContext,client,data);

  } catch(err) {
    console.log('execute_post_submit_extension', err);
  }
}

function execute_validation_extension(appContext,client,documentName,data)
{
  console.log('I AM IN SUBMIT VALIDATION EXTENSION......LOLOLPORTFOLIO'+ documentName);
}

module.exports = 
{
  execute_post_query_extension : execute_post_query_extension,
  execute_post_submit_extension: execute_post_submit_extension,
  execute_validation_extension: execute_validation_extension
}