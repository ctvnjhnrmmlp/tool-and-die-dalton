class Supervisor  {
  constructor(jobNumber, materials, totalWorkingHour, estimatedTime) {
    this.jobNumber = jobNumber;
    this.materials = materials;
    this.totalWorkingHour = totalWorkingHour;
    this.estimatedTime = estimatedTime;
  }
}

document.querySelector('.job-type').addEventListener('change', changeJob);
document.querySelector('.estimated-time').addEventListener('change', changeEstimatedTime);
document.querySelector('.submit-btn').addEventListener('click', handleSubmit);


const estimatedTime = document.querySelector('.time');

function changeJob() {
  const jobType = document.querySelector('.job-type').value;
  const jobTypeElement = document.querySelector('.job-type-display');
  
  let materialsList = '';

  switch (jobType) {
    case 'Metal Stamping':
      jobTypeElement.innerHTML = 'Materials for the Job: Metal Stamping';
      materialsList = [
        'Aluminum',
        'Stainless steel',
        'Copper',
        'Steel alloys',
        'Carbon steel'
      ];
      break;
    case 'Welding and Finishing':
      jobTypeElement.innerHTML = 'Materials for the Job: Welding and Finishing';
      materialsList = [
        'Metal brush',
        'Angle Grinder',
        'Pliers',
        'Welding clamps',
        'Electrodes',
        'Welding magnets'
      ];
      break;
    case 'Laser Cutting Services':
      jobTypeElement.innerHTML = 'Materials for the Job: Laser Cutting Services';
      materialsList = [
        'Foams',
        'PVC',
        'Glass',
        'Polycarbonate',
        'Fiberglass',
        'Metal'
      ];
      break;
    case 'Metal Fabrication Services':
      jobTypeElement.innerHTML = 'Materials for the Job: Metal Fabrication Services';
      materialsList = [
        'Iron',
        'Carbon steel',
        'Welding wire',
        'Bronze',
        'Hardware',
        'Castings'
      ];
      break;
    default:
      jobTypeElement.innerHTML = 'None';
      break;
  }

  displayMaterials(materialsList);
}

function displayMaterials(materialsList) {
  const materialsBody = document.querySelector('.materials-body');
  materialsBody.innerHTML = ''; // Clear previous data

  materialsList.forEach(material => {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.textContent = material;
    row.appendChild(cell);
    materialsBody.appendChild(row);
  });
}


function changeEstimatedTime() {
  const timeElement = document.querySelector('.estimated-time').value;
  

  switch(timeElement){
    case '1 Hour':
      estimatedTime.innerHTML = 'Estimated Time: 1 Hour';
      break;
    case '2 Hours':
      estimatedTime.innerHTML = 'Estimated Time: 2 Hours';
      break;
    case '3 Hours':
        estimatedTime.innerHTML = 'Estimated Time: 3 Hours';
        break;
    case '4 Hours':
      estimatedTime.innerHTML = 'Estimated Time: 4 Hours';
      break;
    case '5 Hours':
        estimatedTime.innerHTML = 'Estimated Time: 5 Hours';
        break;
    case '6 Hours':
      estimatedTime.innerHTML = 'Estimated Time: 6 Hours';
      break;
    default:
      estimatedTime.innerHTML = 'None';
  }
}

//temporary
let totalHours = localStorage.getItem('hoursWorked');

function handleSubmit() {
  const jobNumber = generateJobNumber();
  const jobType = document.querySelector('.job-type').value;
  const jobStatus = document.querySelector('.status').value;
  const datePicker = document.querySelector('.datePicker').value;
  const selectedMaterials = document.querySelectorAll('.materials-body td');
  const displayEstimated = document.querySelector('.estimated-time').value;

  let resultTable = document.querySelector('.result');
  let materialsString = '';

  // Create a string containing the materials
  selectedMaterials.forEach(material => {
    materialsString += '- ' + material.textContent + '<br>';
  });

  let row = resultTable.insertRow(-1);
  let cellJobNum = row.insertCell(0);
  let cellJobType = row.insertCell(1);
  let cellStatus = row.insertCell(2);
  let cellMaterials = row.insertCell(3);
  let cellNotes = row.insertCell(4);
  let cellEstimated = row.insertCell(5);
  let cellDueDate = row.insertCell(6);
  let cellTotal = row.insertCell(7);

  cellJobNum.innerHTML = jobNumber;
  cellJobType.innerHTML = jobType;
  cellStatus.innerHTML = jobStatus;
  cellMaterials.innerHTML = materialsString; // Insert materials
  cellDueDate.innerHTML = datePicker;
  cellEstimated.innerHTML = displayEstimated;

  // Reset job type display, materials textarea, and estimated time display
  document.querySelector('.job-type-display').innerHTML = '';

  estimatedTime.innerHTML = '';

  const jobData = {
    jobNumber: jobNumber,
    jobType: jobType,
    status: jobStatus,
    materials: materialsString,
    estimatedTime: displayEstimated,
    dueDate: datePicker
  };

  let jobList = JSON.parse(localStorage.getItem('jobList')) || [];

  jobList.push(jobData);

  localStorage.setItem('jobList', JSON.stringify(jobList));
}


function displayStoredData() {
  let jobList = JSON.parse(localStorage.getItem('jobList')) || [];
  let resultTable = document.querySelector('.result');

  jobList.forEach(job => {
    let row = resultTable.insertRow(-1);
    let cellJobNum = row.insertCell(0);
    let cellJobType = row.insertCell(1);
    let cellStatus = row.insertCell(2);
    let cellMaterials = row.insertCell(3);
    let cellNotes = row.insertCell(4);
    let cellEstimated= row.insertCell(5);
    let cellDueDate= row.insertCell(6);
    let cellTotal = row.insertCell(7);

    cellJobNum.innerHTML = job.jobNumber;
    cellJobType.innerHTML = job.jobType;
    cellStatus.innerHTML = job.status;
    cellMaterials.innerHTML = job.materials;
    cellDueDate.innerHTML = job.dueDate;
    cellEstimated.innerHTML = job.estimatedTime;
  });
}


displayStoredData();

function generateJobNumber() {
  return Math.floor(Math.random() * 1000); 
}

//stores the total working hours of an emplyee

//console.log(totalHours);
//document.querySelector('.hours-worked').innerHTML = `Total Hours Work: ${totalHours}`;