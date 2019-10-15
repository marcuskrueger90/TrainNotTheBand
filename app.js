var firebaseConfig = {
    apiKey: "AIzaSyCkV0fQUu2nJue8pfLkUkLfemHuUaCTdN0",
    authDomain: "trainscheduler-5cd4e.firebaseapp.com",
    databaseURL: "https://trainscheduler-5cd4e.firebaseio.com",
    projectId: "trainscheduler-5cd4e",
    storageBucket: "",
    messagingSenderId: "1096537441464",
    appId: "1:1096537441464:web:2278e9d697b02af268604d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainFirst = moment($("#first-train-input").val().trim(), "MM/DD/YYYY").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    first: trainFirst,
    frequency: trainFrequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFrequency);

  // Prettify the employee start
  var TrainFirstPretty = moment.unix(trainFirst).format("HH:mm");

//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
//   var empMonths = moment().diff(moment(empStart, "X"), "months");
//   console.log(empMonths);

//   // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFrequency),
    $("<td>").text(TrainFirstPretty),
    
  );

  $("#train-table > tbody").append(newRow);
  
});
var currentTime = moment().format('LTS');
  console.log(currentTime);
  $("#currentTime").text("The current Time is: "+ currentTime);