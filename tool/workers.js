onmessage = function (event) {
  var str = event.data["str"];
  var filename = event.data["filename"];
  var headers = new Array();
  for (var key in str[0]) {
    headers.push(key);  //获取表头
  }
  var dataTable1 = "";
  for(var i=0;i<str.length;i++){
    dataTable1 += "<tr><td>"  + filename + "</td>";
    var json = str[i];

    for( var j=0;j<headers.length;j++){
      dataTable1 += "<td contenteditable='true'>" + json[headers[j]] + "</td>";
    }
    dataTable1 += "</tr>\n";
  }

  postMessage(dataTable1);
}
