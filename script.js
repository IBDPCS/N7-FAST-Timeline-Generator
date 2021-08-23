google.charts.load('current', {
  'packages': ['timeline']
});
// google.charts.setOnLoadCallback(drawChart);

function parseInput() {
  var csvArray = []
  var startDate = document.getElementById("startDate").value
  var runningDate = new Date(startDate)
  var csvString = document.getElementById("tasks").value
 
  csvString.split("\n").forEach(row => csvArray.push(splitUnit(row)))
  convertWeeksToDateRanges(runningDate, csvArray)
  drawChart(csvArray)
}

function splitUnit(unitString) {
  splitIndex = unitString.lastIndexOf(",") 
  return [unitString.substring(0, splitIndex), unitString.substring(splitIndex+1)];
}


function convertWeeksToDateRanges(runningDate, csvArray) {
  //console.log("TasksConverted:", csvArray)
  var lastDate = runningDate
  csvArray.forEach((elem, i) => {
    var dateRange = offsetWeekToDateRange(lastDate, elem[1])
    lastDate = dateRange[1]
    csvArray[i] = [elem[0], ...dateRange]
  })
  
}

function offsetWeekToDateRange(runningDate, w) {
  var startDate = new Date(runningDate)
  var endDate = new Date(runningDate)
  endDate.setDate(runningDate.getDate() + w * 7)
  runningDate = endDate
  return [startDate, endDate];
}





function drawChart(csvArray) {
  var container = document.getElementById('timeline');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();
  dataTable.addColumn({
    type: 'string',
    id: 'Topic'
  });
  dataTable.addColumn({
    type: 'date',
    id: 'Start'
  });
  dataTable.addColumn({
    type: 'date',
    id: 'End'
  });
  dataTable.addRows(csvArray)

  // dataTable.addRows([
  //   ['Topic 4 (45 hrs): Computational thinking, problem-solving and programming', new Date(2021, 1, 30),
  //     new Date(2021, 7, 10)
  //   ],
  //   ['Topic 5 (23 hrs): Abstract data structures', new Date(2021, 2, 30), new Date(2021, 7, 10)],
  //   ['IA (40 hours)', new Date(2021, 4, 30), new Date(2022, 3, 10)],
  //   ['Topic 2 (6 hrs): Computer organization', new Date(2021, 7, 10), new Date(2021, 8, 30)],
  //   ['Topic 6 (8 hrs): Resource management', new Date(2021, 7, 20), new Date(2021, 8, 30)],
  //   ['Topic 3 (9 hrs): Networks', new Date(2021, 8, 30), new Date(2021, 9, 14)],
  //   ['Topic 1 (20 hrs): System fundamentals', new Date(2021, 9, 14), new Date(2021, 10, 30)],
  //   ['Topic 7 (14 hrs): Control', new Date(2021, 10, 30), new Date(2021, 12, 7)],
  //   ['Paper 2 (30+15 hrs)', new Date(2022, 1, 30), new Date(2022, 4, 30)],
  //   ['Paper 3 (35 hrs)', new Date(2022, 4, 30), new Date(2022, 7, 30)],
  //   ['Revision', new Date(2022, 7, 30), new Date(2022, 11, 1)]
  // ]);
  var options = {
    timeline: {
      showRowLabels: true
    }
  };
  chart.draw(dataTable, options);
}