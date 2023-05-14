// const H"
// const 
 

// let table = base.getTable("Documents");
// let record = await input.recordAsync('Pick a record', table);
// if (record) {
//     // output.text(`You picked ${record.getCellValueAsString("DocURL")}`);
//     let noteId = record.getCellValueAsString("DocURL").split('hackmd.io/')[1]
//     let response = await remoteFetchAsync(`https://api.hackmd.io/v1/notes/${noteId}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${HACKMD_API_TOKEN}`
//         },
//     });
//     let data = await response.json()
//     await table.updateRecordAsync(record.id, {
//         "Markdown" : data.content,
//     })
//     output.markdown(data.content)
// }


