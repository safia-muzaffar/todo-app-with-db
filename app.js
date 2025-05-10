const firebaseConfig = {
    apiKey: "AIzaSyCrFbGs_CziVDsi1NfnFGgQsDpvu8oSb8s",
    authDomain: "todoapp-7645e.firebaseapp.com",
    databaseURL: "https://todoapp-7645e-default-rtdb.firebaseio.com",
    projectId: "todoapp-7645e",
    storageBucket: "todoapp-7645e.firebasestorage.app",
    messagingSenderId: "679637224121",
    appId: "1:679637224121:web:d050f747aa95ecb0122968"
  };

  firebase.initializeApp(firebaseConfig);

  firebase.database().ref("toDos").on("child_added", function (data) {
    const todo = data.val();
   
      const liElement = document.createElement("li");

      const textSpan = document.createElement("span");
      textSpan.textContent = todo.todo_value;

      const btnContainer = document.createElement("div");

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.className = "deletebtn";
      delBtn.id = todo.id;
      delBtn.onclick = function () { deleteSingleTodo(this); };

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "editbtn";
      editBtn.id = todo.id;
      editBtn.onclick = function () { editSingleTodo(this); };

      btnContainer.appendChild(delBtn);
      btnContainer.appendChild(editBtn);

      liElement.appendChild(textSpan);
      liElement.appendChild(btnContainer);

      document.getElementById("ul_data").appendChild(liElement);
    
    
  });

  function addTodo() {
    try {
      const inputData = document.getElementById("todoInput");
      if (inputData.value) {
        
        
        const id = firebase.database().ref("toDos").push().key;
        const obj = {
          todo_value: inputData.value,
          id: id
        };
        firebase.database().ref(`toDos/${id}`).set(obj);
        inputData.value = ""; // Clear input field
        return
      }
      else{
        alert('required fields are missing')
        return
      }
    } catch (error) {
      console.log(error);
    }
  }

  function deleteAllTodos() {
    document.getElementById("ul_data").innerHTML = "";
    firebase.database().ref("toDos").remove();
  }

  function deleteSingleTodo(btn) {
    btn.parentNode.parentNode.remove();
    firebase.database().ref(`toDos/${btn.id}`).remove();
  }

  function editSingleTodo(btn) {
    const updatedText = prompt("Enter updated value:");
    if (updatedText) {
      btn.parentNode.parentNode.firstChild.textContent = updatedText;
      const obj = {
        todo_value: updatedText,
        id: btn.id
      };
      firebase.database().ref(`toDos/${btn.id}`).set(obj);
    }
  }
