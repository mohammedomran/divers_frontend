function checkAvailability() {
    let adultsNumber=document.getElementById("adultsNumber").value;
    let kidsNumber=document.getElementById("kidsNumber").value;
    let checkIn=document.getElementById("checkIn").value;
    let checkOut=document.getElementById("checkOut").value;
    let roomType=document.getElementById("roomsList").value;
    StoreFormParametersInLocalStorage(adultsNumber, kidsNumber, checkIn, checkOut, roomType);
  
    axios.post('http://localhost:6600/api/reservations/check', {
      "id":roomType,
      "adultsNumber":adultsNumber,
      "kidsNumber":kidsNumber,
      "checkIn":new Date(checkIn).toLocaleDateString(),
      "checkOut":new Date(checkOut).toLocaleDateString()
    })
    .then(function (response) {
      if(response.status == 200) {
        
        document.getElementById("next").disabled = false;
      }
    })
    .catch(function (error) {
      alert("rooms not available or form fields aren't complete")
      document.getElementById("clockdiv").style.display="none";
      document.getElementById("next").disabled = true;
    });
  
  }

  
  function checkIfReservationStored() {
    var token = window.localStorage.getItem("token");

    axios.get('http://localhost:6600/api/reservations/'+token)
    .then(function (response) {
      if(response.status == 200) {
        return true;
      }
    })
    .catch(function (error) {
      return false;
    });

  }  