class Worker {
  constructor(startTime, endTime, jobNumber) {
    this.startTime = startTime;
    this.endTime = endTime;
    
    this.jobNumber = jobNumber;
  }

  getHoursWorked() {
    let [startHours, startMinutes] = this.startTime.split(':').map(Number);
    let [endHours, endMinutes] = this.endTime.split(':').map(Number);

    let totalStartMinutes = startHours * 60 + startMinutes;
    let totalEndMinutes = endHours * 60 + endMinutes;

    let totalMinutes = totalEndMinutes - totalStartMinutes;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    return `${hours} hours and ${minutes} minutes`;
  }

  getCurrentDate(){
    const today = new Date();
    const f = new Intl.DateTimeFormat("en-us", {
      dateStyle: "short"
    });

    return `${f.format(today)}`;
  }
}
let isLogin = false;

document.querySelector('.endTime').disabled = true;
  
document.querySelector('.js-changeBtn').addEventListener('click', () => {
  handleClick();
});

function handleClick() {
  let startTime = document.querySelector('.startTime').value;
  let endTime = document.querySelector('.endTime').value;

  const changeElement = document.querySelector('.js-changeBtn');
  const resultTable = document.querySelector('.result');
  

  let worker;
  let arr = [];

  let  jobNumber= localStorage.getItem('jobNumber');

  if (!isLogin) {
    

    if (!localStorage.getItem('jobList') || JSON.parse(localStorage.getItem('jobList')).length === 0) {
      alert('Supervisor did not assign any job');
      isLogin = false;
    }else{
      changeElement.innerHTML = 'Logout';
      document.querySelector('.endTime').disabled = false;
      console.log('i logged in');
      isLogin = true;
      worker = new Worker(startTime, '',  jobNumber);
    }
      

  } else {
    changeElement.innerHTML = 'Login';
    document.querySelector('.endTime').disabled = true;
    console.log('i logged out');
    isLogin = false;
    worker = new Worker(startTime, endTime, jobNumber);

    let jobList = JSON.parse(localStorage.getItem('jobList')) || [];
    let resultTable = document.querySelector('.result');

    let row = resultTable.insertRow(-1);
    let cellStart = row.insertCell(0);
    let cellEnd = row.insertCell(1);
    let cellDate = row.insertCell(2);
  
  
    cellStart.innerText = worker.startTime;
    cellEnd.innerText = worker.endTime;

    cellDate.innerText = worker.getCurrentDate();
    jobList.forEach(job => {
      let cellJobNum = row.insertCell(3);
      let cellStatus = row.insertCell(4);
      let cellType = row.insertCell(5);

      cellJobNum.innerHTML = job.jobNumber;
      cellStatus.innerHTML = job.status;
      cellType.innerHTML = job.jobType;
    });

    jobList.forEach((job, index) => {
      if (job.jobNumber === worker.jobNumber && job.status === worker.status && job.jobType === worker.jobType) {
        jobList.splice(index, 1); // Remove the item from the jobList array
      }else{
        
      }
    });

    localStorage.setItem('jobList', JSON.stringify(jobList));

    const workerData = {
      timeIn: worker.startTime,
      timeOut: worker.endTime,
      date: worker.getCurrentDate()
    }
    
  }

} 


function displayStoredData() {
  let jobList = JSON.parse(localStorage.getItem('jobList')) || [];
  let resultTable = document.querySelector('.result');

  jobList.forEach(job => {
    let row = resultTable.insertRow(2);
    let cellJobNum = row.insertCell(0);
    let cellStatus = row.insertCell(1);
    let cellType = row.insertCell(2);

    cellJobNum.innerHTML = job.jobNumber;
    cellStatus.innerHTML = job.status;
    cellType.innerHTML = job.jobType;
  });
}

