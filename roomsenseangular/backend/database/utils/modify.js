/* let array =  [
  "{\"deviceId\":\"sonja\",\"_ts\":1559309009}",
  "{\"deviceId\":\"yannik-rpi3\",\"_ts\":1559245236}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.86,\"humidity\":42.66,\"_ts\":1559243413}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.88,\"humidity\":42.66,\"_ts\":1559243408}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.89,\"humidity\":42.66,\"_ts\":1559243403}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.88,\"humidity\":42.68,\"_ts\":1559243398}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.87,\"humidity\":42.66,\"_ts\":1559243393}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.88,\"humidity\":42.66,\"_ts\":1559243388}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.89,\"humidity\":42.68,\"_ts\":1559243383}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.88,\"humidity\":42.66,\"_ts\":1559243378}",
  "{\"deviceId\":\"yannik-rpi3\",\"temperature\":23.87,\"humidity\":42.68,\"_ts\":1559243373}"
  ]; */

let sensorDummy = [
  {
    deviceId: "yannik-rpi3",
    temperature: 27.43,
    humidity: 37.71,
    _ts: 1559934704
  }
];
let roomDummy = [
  {
    deviceId: "yannik-rpi3",
    roomName: "yannikTest",
    lowerTempLimit: 22,
    upperTempLimit: 30,
    lowerHumiLimit: 12,
    upperHumiLimit: 44,
    message: true
  },
  {
    deviceId: "raspberryLuca",
    roomName: "Luca",
    lowerTempLimit: 20,
    upperTempLimit: 30,
    lowerHumiLimit: null,
    upperHumiLimit: null,
    message: true
  }
];



function getLatestEntries(a) {
  let dataToDisplay = a;
  let nameArray = [];
  let nameCount = dataToDisplay.length;
  for (let i = 0; i < nameCount; i++) {
    nameArray.push(dataToDisplay[i].deviceId);
  }


  let distinctNameArray = [...new Set(nameArray)];
  let distLen = distinctNameArray.length;
  let distinctIndexes = [];
  for (let i = 0; i < distLen; i++) {
    distinctIndexes.push(nameArray.indexOf(distinctNameArray[i]));
  }

  let newDataArray = [];
  let distInLen = distinctIndexes.length;

  for (let i = 0; i < distInLen; i++) {
    newDataArray.push(a[distinctIndexes[i]]); //a[disinctIndexes[i]]
  }


  return newDataArray;
}

function mergeSensorAndRoom(sensorData, roomData) {

  //Deklarationen
  let dataLen = sensorData.length;
  let roomsLen = roomData.length;
  let roomNames = [];
  let dataNames = [];
  let matchingIndexes = [];
  let newData = [];
  let roomsWithData = [];
  let roomsWithoutData = [];

  //Raumnamen Array
  for (let s = 0; s < roomsLen; s++) {
    roomNames.push(roomData[s].deviceId);
  }

  //Daten deviceId Array
  for (let r = 0; r < dataLen; r++) {
    dataNames.push(sensorData[r].deviceId);
  }

  for (let q = 0; q < dataLen; q++) {

    let index = roomNames.indexOf(dataNames[q]); // Index des Raumes zu dem Daten an Stelle q gehören

    //let index = datenNames.indexOf(raumeNames[q]) //Index im Daten Array für aktuellen Raum, -1 wenn für Raum keine Daten vorliegen
    if (index >= 0) {
      newData.push({
        deviceId: roomData[index].deviceId, //datennames[q]
        room: roomData[index].roomName,
        temp: sensorData[q].temperature,
        hum: sensorData[q].humidity,
        upperTemp: roomData[index].upperTempLimit,
        lowerTemp: roomData[index].lowerTempLimit,
        upperHumi: roomData[index].upperHumiLimit,
        lowerHumi: roomData[index].lowerHumiLimit,
        message: roomData[index].message,
        _ts: sensorData[q]._ts,
      });
      roomsWithData.push(roomData[index].deviceId);
    } else {
      //Raum nicht gespeichert

      newData.push({
        deviceId: dataNames[q],
        room: null,
        temp: sensorData[q].temperature,
        hum: sensorData[q].humidity,
        upperTemp: null,
        lowerTemp: null,
        upperHumi: null,
        lowerHumi: null,
        message: null,
        _ts: sensorData[q]._ts,
      });
    }
  }

  //Räume ohne Daten finden und auch in new Data Array
for (let z = 0; z < roomsLen; z++) {
  if (roomsWithData.indexOf(roomNames[z]) < 0) {
    roomsWithoutData.push(roomNames[z]);


    // Einkommentieren, wenn alle gespeicherten Räume in der
    // Übersicht angezeigt werden sollen anstatt nur die Räume der aktuellen Sensoren
    /* newData.push({
      deviceId: roomNames[z], // roomNames[z] null
      room: roomData[z].roomName,
      temp: null,
      hum: null,
      upperTemp: roomData[z].upperTempLimit,
      lowerTemp: roomData[z].lowerTempLimit,
      upperHum: roomData[z].upperHumiLimit,
      lowerHum: roomData[z].lowerHumiLimit,
      _ts: null,
    }); */
  }
}

return newData;
}


function getEvery20Temp(array) {
  let arrayLen = array.length;
  let statTemp = [];

  for(let i = 1; i < arrayLen; i+=20){
      statTemp.push(array[i].temperature);
      //statHum.push(array[i].humidity);
  }

  return statTemp;
  }

  function getEvery20Hum(array) {
    let arrayLen = array.length;
    let statHum = [];

    for(let i = 1; i < arrayLen; i+=20){
        statHum.push(array[i].humidity);
        //statHum.push(array[i].humidity);
    }
    return statHum;
    }

    function getEvery20Time(array) {
      let arrayLen = array.length;
      let statTime = [];

      for(let i = 1; i < arrayLen; i+=20){
          statTime.push(array[i]._ts);
          //statHum.push(array[i].humidity);
      }

      return statTime;
      }

module.exports = {
  getLatestEntries: getLatestEntries,
  mergeSensorAndRoom: mergeSensorAndRoom,
  getEvery20Hum: getEvery20Hum,
  getEvery20Temp: getEvery20Temp,
  getEvery20Time: getEvery20Time
};
