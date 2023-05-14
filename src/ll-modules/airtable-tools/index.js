const Airtable = require('airtable')

// module.exports.saveOneRecord = async ({ record, table, base }) => {
//     const base = Airtable.base('');
//     return `saved your record`
// }

module.exports.findRecordByValue = async ({ baseId, table, field, value, view }) => {
    var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(baseId);
    theRecords = [];
    await base(table).select({
        maxRecords: 1,
        view: view ? view : "Grid view",
        filterByFormula: `${field}='${value}'`
    }).eachPage(function page(records, next){
        theRecords.push(...records);
        next()
      })
      // .then(()=>{
      //   // return(theRecords);
      // })
      .catch(err=>{console.error(err); return})
    // console.log(JSON.stringify(theRecords))
    return theRecords[0];
}

module.exports.findRecordById = async function({ baseId, table, recordId }) {
  console.log(`looking for ${recordId} in ${table} in ${baseId}`)  
  var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(baseId);
    var result = await base(table)
      .find(recordId)
      .catch(err=>{console.error(err); return});
    console.log(JSON.stringify(result, null, 4))
    return result;
}


module.exports.addRecord = async function({ baseId, table, record }){
  var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(baseId);
  var airtableResult = await base(table).create(record).then(result => {
    console.log("saved to airtable");
    return result;
  })
    .catch(err => {
      console.log("\nthere was an error with the AT push\n");
      console.error(err);
      return;
    });
  return airtableResult;
}


module.exports.findRecordById = async function({ baseId, table, recordId }) {
  console.log(`looking for ${recordId} in ${table} in ${baseId}`)  
  var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(baseId);
    var result = await base(table)
      .find(recordId)
      .catch(err=>{console.error(err); return});
    // console.log(JSON.stringify(result, null, 4))
  return result;
}

module.exports.findMany = async ({ baseId, table, view }) => {
    var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(baseId);
    console.log(`looking in airtable`)
    var theRecords = [];
    await base(table).select({
        maxRecords: 100,
        view: view ? view : "Grid view"
    }).eachPage(function page(records, next){
        theRecords.push(...records);
        next()
      })
      // .then(()=>{
      //   // return(theRecords);
      // })
      .catch(err=>{console.error(err); return})
    // console.log(JSON.stringify(theRecords, null, 4))
    return theRecords;
}

module.exports.findManyByValue = async ({ baseId, table, field, value, view }) => {
  var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(baseId);
  let theRecords = [];
  await base(table).select({
      maxRecords: 100,
      view: view ? view : "Grid view",
      filterByFormula: `${field}='${value}'`
  }).eachPage(function page(records, next){
      theRecords.push(...records);
      next()
    })
    // .then(()=>{
    //   // return(theRecords);
    // })
    .catch(err=>{console.error(err); return})
  console.log(JSON.stringify(theRecords))
  return theRecords;
}