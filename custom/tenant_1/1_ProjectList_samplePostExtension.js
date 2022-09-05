async function execute_post_query_extension(
  appContext,
  queryName,
  params,
  data,
  client
) {
  data = JSON.parse(data);
  const projectIds = data.map((e) => e.project_id);
  if (!projectIds.length) {
    return JSON.stringify([]);
  }
  const memberData = await client.query(
    `SELECT fp.first_name , fp.last_name , fp.middle_name, akm.c_attr_1, akm.project_id 
            from fntl_person fp
            join acm_project_key_members akm
            on fp.person_id = akm.person_id
            where akm.c_attr_1 IN ( 'Project Manager', 'Project Director',
            'Project Director 2','Project Accountant',
            'Project Accountant Alternate', 'Finance Lead',
            'Finance Lead 2' ) and akm.project_id in (${projectIds.join()})`
  );

  const members = memberData.rows ? memberData.rows : [];
  const classificationMappingData = await client.query(`select key_value, source_value from fntl_mapping
where source_value = 'AECOM Business Line Segment' or source_value ='AECOM Contract Type'
or source_value ='AECOM Risk Category' and mapping_type = 'classification'`);
  let classificationData = [];
  if (classificationMappingData.rows && classificationMappingData.rows.length) {
    const classfications = await client.query(`select ${classificationMappingData.rows
      .map((classification) => classification.key_value)
      .join(" ,")}, project_id from acm_project_denorm
  where project_id in (${projectIds.join()})`);

    classificationData = classfications.rows ? classfications.rows : [];
  }

  let classificationDetails = {};

  classificationMappingData.rows.forEach(
    (item) => (classificationDetails[item.key_value] = item.source_value)
  );
  classificationData = classificationData.map((e) => {
    const classKeys = Object.keys(e).filter((key) => key != "project_id");

    const keyMappings = [];
    classKeys.forEach((key) => {
      const obj = {};
      obj["key_value"] = e[key];
      obj["key_name"] = classificationDetails[key];
      obj["project_id"] = e.project_id;
      keyMappings.push(obj);
    });
    return [...keyMappings];
  });

  data = data.map((item) => {
    item.members = members.filter(
      (member) => (member.project_id = item.project_id)
    );
    item.classification = classificationData.filter(
      (classification) => (classification.project_id = item.project_id)
    );
    return item;
  });
  console.log("data", data);
  return JSON.stringify(data);
}

function execute_post_submit_extension(appContext,client,documentName,data)
{
  console.log('I AM IN POST SUBMIT  EXTENSION......'+ documentName);
}

function execute_validation_extension(appContext,client,documentName,data)
{
  console.log('I AM IN SUBMIT VALIDATION EXTENSION.........'+ documentName);
}

module.exports = 
{
  execute_post_query_extension : execute_post_query_extension,
  execute_post_submit_extension: execute_post_submit_extension,
  execute_validation_extension: execute_validation_extension
}