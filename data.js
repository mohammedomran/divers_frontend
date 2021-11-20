function listRoomTypes() {
    fetch('http://localhost:6600/api/rooms')
    .then(response => response.json())
    .then(data => {
      let rooms=data
      var roomsContainer = document.getElementById("roomsList");
      roomsContainer.innerHTML = '';
      for (let i=0; i<rooms.length; i++) {
        roomsContainer.innerHTML += '<option id="roomtype-'+rooms[i].Id+'" value='+rooms[i].Id+'>'+rooms[i].Type+'</option>';
      }
      getFieldsFromLocalstorage()
    });
  }
  
  function getFieldsFromLocalstorage() {
    let formData = JSON.parse(window.localStorage.getItem("formData"));
    if(formData != null) {
        document.getElementById("adultsNumber").value=formData.adultsNumber;
        document.getElementById("kidsNumber").value=formData.kidsNumber;
        document.getElementById("checkIn").value=formData.checkIn;
        document.getElementById("checkOut").value=formData.checkOut;
        document.getElementById("roomtype-"+formData.roomType).selected=true
    }
  }

  function StoreFormParametersInLocalStorage(adultsNumber, kidsNumber, checkIn, checkOut, roomType) {
    var formData = {
      "adultsNumber":adultsNumber,
      "kidsNumber":kidsNumber,
      "checkIn":checkIn,
      "checkOut":checkOut,
      "roomType":roomType,
    }
    window.localStorage.setItem("formData", JSON.stringify(formData));
  }
  
  function AppendFormParametersInLocalStorage(name, email, country, mealType) {
    var formData = JSON.parse(window.localStorage.setItem("formData"));
    formData.name = name;
    formData.email = email;
    formData.country = country;
    formData.mealType = mealType;
    window.localStorage.setItem("formData", JSON.stringify(formData));
  }

  
function listMealsTypes() {
    axios.get('http://localhost:6600/api/meals')
    .then(function (response) {
      let meals=response.data
      var mealsContainer = document.getElementById("mealsList");
      mealsContainer.innerHTML = '';
      for (let i=0; i<meals.length; i++) {
        mealsContainer.innerHTML += '<option value='+meals[i].Id+'>'+meals[i].Type+'</option>';
      }
    })
    .catch(function (error) {
    });
  }

  
  function showCost() {
    axios.post('http://localhost:6600/api/reservations/cost', {
      "name":document.getElementById("name").value,
      "email":document.getElementById("email").value,
      "country":document.getElementById("country").value,
      "mealId":document.getElementById("mealsList").value,
      "token":window.localStorage.getItem("token")
    })
    .then(function (response) {
      if(response) {
        goToStep3(response.data);
        window.localStorage.clear();
      }
    })
    .catch(function (error) {
      alert("An error happens, make sure you filled all fields");
    });
  }

  function updatePermenantReservation() {  
    var token = window.localStorage.getItem("token");
    let adultsNumber=document.getElementById("adultsNumber").value;
    let kidsNumber=document.getElementById("kidsNumber").value;
    let checkIn=document.getElementById("checkIn").value;
    let checkOut=document.getElementById("checkOut").value;
    let roomType=document.getElementById("roomsList").value;
    StoreFormParametersInLocalStorage(adultsNumber, kidsNumber, checkIn, checkOut, roomType);
    let formData = JSON.parse(window.localStorage.getItem("formData"));
    /********************************************** */
    axios.post('http://localhost:6600/api/reservations/check', {
      "id":roomType,
      "adultsNumber":adultsNumber,
      "kidsNumber":kidsNumber,
      "checkIn":new Date(checkIn).toLocaleDateString(),
      "checkOut":new Date(checkOut).toLocaleDateString()
    })
    .then(function (response) {
      console.log("updating");
      if(response.status == 200) {
        
        //then update
        axios.post('http://localhost:6600/api/reservations/permenant/update', 
        {
          "adultsNumber":formData.adultsNumber,
          "kidsNumber":formData.kidsNumber,
          "checkIn":formData.checkIn,
          "checkOut":formData.checkOut,
          "roomId":formData.roomType,
          "token":token
        }
        )
        .then(function (response) {
        })
        .catch(function (error) {
          alert("An error happens")
        });
        showStep2();
      }
    })
    .catch(function (error) {
      if(error.status == 400) {
        alert("please fill all fields");
      } else {
        alert("Sorry, there're no available rooms but you may decrease the needed rooms and try again")
      }
      showStep1();
    });
    /********************************************** */
}


function storePermenantReservation() {
  var token = Math.random().toString(36).substr(2);
  window.localStorage.setItem("token", token);

  let adultsNumber=document.getElementById("adultsNumber").value;
  let kidsNumber=document.getElementById("kidsNumber").value;
  let checkIn=document.getElementById("checkIn").value;
  let checkOut=document.getElementById("checkOut").value;
  let roomType=document.getElementById("roomsList").value;
  StoreFormParametersInLocalStorage(adultsNumber, kidsNumber, checkIn, checkOut, roomType);
  let formData = JSON.parse(window.localStorage.getItem("formData"));

  /********************************************** */
  axios.post('http://localhost:6600/api/reservations/check', {
    "id":roomType,
    "adultsNumber":adultsNumber,
    "kidsNumber":kidsNumber,
    "checkIn":new Date(checkIn).toLocaleDateString(),
    "checkOut":new Date(checkOut).toLocaleDateString()
  })
  .then(function (response) {
    console.log("storing");
    if(response.status == 200) {

      //countdownTimer.init();

      axios.post('http://localhost:6600/api/reservations/permenant/store', 
        {
          "adultsNumber":adultsNumber,
          "kidsNumber":kidsNumber,
          "checkIn":new Date(checkIn).toLocaleDateString(),
          "checkOut":new Date(checkOut).toLocaleDateString(),
          "roomId":roomType,
          "token":token
        }
      )
      .then(function (response) {
        if(response.status==200) {
          showStep2();
        }
      })
      .catch(function (error) {
      });
    }
  })
  .catch(function (error) {
    if(error.status == 400) {
      alert("please fill all fields");
    } else {
      alert("Sorry, there're no available rooms but you may decrease the needed rooms and try again")
    }
    showStep1();
  });
/********************************************** */
}


  