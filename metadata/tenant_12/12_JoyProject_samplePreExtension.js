function execute_pre_query_extension(appContext,queryName,params)
{
  console.log('I AM IN PRE-QUERY EXTENSION......'+ queryName);
}

function execute_pre_submit_extension(appContext,client,documentName,data)
{
  console.log('I AM IN PRE SUBMIT  EXTENSION......'+ documentName);
  console.log('New Data......'+ JSON.stringify(data));
}

module.exports = 
{
  execute_pre_query_extension : execute_pre_query_extension,
  execute_pre_submit_extension : execute_pre_submit_extension
}