function execute_post_query_extension(appContext,queryName,params,data)
{
  console.log('I AM IN POST QUERY EXTENSION......*'+JSON.stringify(data)+'*');
  return data;
}

function execute_post_submit_extension(appContext,client,documentName,data)
{
  console.log('I AM IN POST SUBMIT  EXTENSION......'+ documentName);
}

function execute_validation_extension(appContext,client,documentName,data)
{
  console.log('I AM IN SUBMIT VALIDATION EXTENSION......'+ documentName);
}

module.exports = 
{
  execute_post_query_extension : execute_post_query_extension,
  execute_post_submit_extension: execute_post_submit_extension,
  execute_validation_extension: execute_validation_extension1
}