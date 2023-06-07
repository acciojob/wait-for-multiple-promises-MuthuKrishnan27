// //your JS code here. If required.
// let tbody = document.getElementById("output");
// 	let tr1 = document.createElement("tr");
// 	tr1.id = "tr1";
// 		let td1 = document.createElement("td");
// 		td1.innerText = "Loading...";
// 	tr1.append(td1);
// 		let td2 = document.createElement("td");
// 		td2.innerText = "Loading...";
// 	tr1.append(td2);
// tbody.appendChild(tr1);

// let tr2 = document.createElement("tr");
// tr2.id = "tr2";
// 	let td3 = document.createElement("td");
// 		td3.innerText = "Loading...";
// 	tr2.append(td3);
// 	let td4 = document.createElement("td");
// 		td4.innerText = "Loading...";
// 	tr2.append(td4);
// tbody.appendChild(tr2);

// let tr3 = document.createElement("tr");
// tr3.id = "tr3";
// 	let td5 = document.createElement("td");
// 		td5.innerText = "Loading...";
// 	tr3.append(td5);
// 	let td6 = document.createElement("td");
// 		td6.innerText = "Loading...";
// 	tr3.append(td6);
// tbody.appendChild(tr3);

// let tr4 = document.createElement("tr");
// tr4.id = "tr4";
// 	let td7 = document.createElement("td");
// 		td7.innerText = "Loading...";
// 		tr4.append(td7);
// 	let td8 = document.createElement("td");
// 		td8.innerText = "Loading...";
// 		tr4.append(td8);
// tbody.appendChild(tr4);

// let promises = [ new Promise((resolve){
// 		setTimeout(()=>{
// 			resolve("Promise1");
// 			// td1.innerText = "Promise 1"
// 		},((Math.random()*3 + 1)*1000))
// 	}),
// 	new Promise((resolve){
// 		setTimeout(()=>{
// 			resolve("Promise2");
// 			// td1.innerText = "Promise 2";
// 		},((Math.random()*3 + 1)*1000))
// 	}),
// 	new Promise((resolve){
// 		setTimeout(()=>{
// 			resolve("Promise3");
// 			// td1.innerText = "Promise 3";
// 		},((Math.random()*3 + 1)*1000))
// 	})];

// const startTime = Performance.now();

// Promise.all(promises.map((promise)=>{
// 	promise.then((result)=>{
// 		const endTime = Performance.now();
// 		const timeTaken = endTime - startTime;
// 		const time  = timeTaken.toFixed(4);
// 		return result;
// 	})
// })).then((results)=>{
// 	console.log(results);
// }).catch((errors)=>{
// 	console.error("One or more promises rejected:", error);
// })
	
// Get the table element
const table = document.getElementById("myTable");

// Create an array of three promises
const promises = Array.from({ length: 3 }, () => {
  return new Promise((resolve) => {
    const randomTime = Math.floor(Math.random() * 3000) + 1000; // Random time between 1 and 3 seconds
    setTimeout(() => {
      resolve(randomTime);
    }, randomTime);
  });
});

// Add a loading row to the table
const loadingRow = table.insertRow();
const loadingCell = loadingRow.insertCell();
loadingCell.textContent = "Loading...";
loadingCell.colSpan = 2;

// Use Promise.all to wait for all promises to resolve
Promise.all(promises)
  .then((results) => {
    // Remove the loading row
    table.deleteRow(0);

    // Populate the table with the resolved values
    results.forEach((time, index) => {
      const row = table.insertRow();
      const promiseCell = row.insertCell();
      const timeCell = row.insertCell();

      promiseCell.textContent = `Promise ${index + 1}`;
      timeCell.textContent = (time / 1000).toFixed(3);
    });

    // Calculate the total time taken
    const totalTime = results.reduce((sum, time) => sum + time, 0) / 1000;
    const totalRow = table.insertRow();
    const totalPromiseCell = totalRow.insertCell();
    const totalTimeCell = totalRow.insertCell();

    totalPromiseCell.textContent = "Total";
    totalTimeCell.textContent = totalTime.toFixed(3);
  })
  .catch((error) => {
    console.error("One or more promises rejected:", error);
  });
