import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import Select from "react-select";
import { MDBDataTableV5 } from 'mdbreact';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ExcelPage.css'
import axios from 'axios';
import Papa from "papaparse";

import {serverAddress} from "../constants";

export default function ExcelPage() {

  const [selected, setSelected] = useState();
  const [jsonCSV, setJsonCSV] = useState()
  
  const options = [
    { value: 'DailyCSV', label: 'Daily' },
    { value: 'PrimaryCSV', label: 'Primary' },
    { value: 'PainCSV', label: 'Pain' },
    { value: 'indexesCSV', label: 'Band' },
  ]

  async function preview() {
    var csv = await getExcel()
    csv = decodeURI(csv)
    Papa.parse(csv, {
      complete: function(results) {
        console.log("Finished");
        var dataTable = {columns: [], rows: []}
        if (results.data[0][0] === 'UserID') {
          dataTable.columns = results.data[0].map(x => ({label: x, field: x}))
          dataTable.rows = results.data.slice(1).map(row => setRow(row, results.data[0]))
        } else {
          dataTable.columns = results.data[1].map(x => ({label: x, field: x}))
          dataTable.rows = results.data.slice(2).map(row => setRow(row, results.data[1]))
        }
        setJsonCSV(dataTable)
      }}
    )
  }

  async function download() {
    console.log(await getExcel())
  }

  async function getExcel() {
    try {
      var response = await axios.post(serverAddress+'/export/'+selected, {password: 'RheumaticMonitor123!'})
      return response.data.substring(37)
    } catch(e) {
      console.log(e)
    }
  }


  return (
    <div>
      <h1>This is Download Daily Excel Page</h1>
      <div id="ExcelButtoms">
        <Select options={options} isSearchable={true} onChange={e => setSelected(e.value)}/>
        <Button className='excelButton' onClick={preview}>Preview</Button>
        <Button className='excelButton'onClick={download}>Download</Button>
      </div>
      {jsonCSV && <MDBDataTableV5 className='container' striped bordered={true} borderless={false} small data={jsonCSV} materialSearch fullPagination></MDBDataTableV5>}
    </div>
  )
}


function setRow(row, columns) {
  var data = {}
  for (let index=0; index<row.length; index++) {
    data[columns[index]] = row[index]
  }
  return data
}



{/* <table style={{width: '100%', minWidth: '1000px'}}>
<tbody>
  {
    jsonCSV.map((row, i) => {
      return (
        <tr key={i}>
          {
            row.map((col, x) => {
              return (
                <td key={x}>
                  <p>{col}</p>
                </td>
              );
            })
          }
        </tr>
      );
    })
  }
</tbody>
</table> */}