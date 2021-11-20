function goToStep1() {
    window.localStorage.setItem("currentStep", 1);
    document.getElementById("next").disabled = true;
    showStep1();
  }
  
  function goToStep2() {
      window.localStorage.setItem("currentStep", 2);
      //showStep2(); //moved to update and store function
      checkIfReservationStored() ? updatePermenantReservation() : storePermenantReservation();
    
  }
  
  function goToStep3(cost) {
    window.localStorage.setItem("currentStep", 3);
    showStep3(cost);
  }
  
  function showStep1() {
    document.getElementById("step1").style.display="block";
    document.getElementById("step2").style.display="none";
    document.getElementById("step3").style.display="none";
  }
  function showStep2() {
    document.getElementById("step1").style.display="none";
    document.getElementById("step2").style.display="block";
    document.getElementById("step3").style.display="none";
  }
  function showStep3(cost) {
    document.getElementById("step1").style.display="none";
    document.getElementById("step2").style.display="none";
    document.getElementById("step3").style.display="block";
    document.getElementById("costContent").innerText = cost;
  }

  
function checkTheUserCurrentStep() {
    var currentStep = window.localStorage.getItem("currentStep");
    if(currentStep !=2 && currentStep !=3) currentStep=1;
    if(currentStep==1) showStep1();
    if(currentStep==2) showStep2();
    if(currentStep==3) showStep3();
  }