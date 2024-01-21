//declaration de variable
//-->app
var app = document.getElementById("app")
var title = "<h1>todo list project</h1>"

//-->array that content todolist item
var todoListTable = []

var todoItemBlocContainer = document.createElement("div")
todoItemBlocContainer.id = "todoItemBlocContainer"


//object contenant les fonctions
listnerFunction = {
    //-->fonction affichage entente : todolist project
    showTitle: () => {
        app.innerHTML = title

    },
    //-->create todolist input field
    enterTodoListItem: () => {
        var form = document.createElement("form")
        form.action = ""
        form.id = "todo"
        form.className = "todo"

        var input = document.createElement("input")
        input.type = "text"
        input.name = "inputTodo"
        input.id = "inputTodo"
        input.className = "inputTodo"
        input.placeholder = "Enter todo ..."
        input.required = true

        var submit = document.createElement('input')
        submit.type = "submit"
        submit.id = "submit"
        submit.value = "add todo"

        form.appendChild(input)
        // form.appendChild(submit)
        app.appendChild(submit)

        app.appendChild(form)
    },
    createTodoListeItems: () => {
        var addtodoBt = document.querySelector("input#submit")
        addtodoBt.addEventListener('click', () => {

            //creation du form
            var form = document.forms["todo"]
            var formdata = new FormData(form)
            var todoListItem = formdata.get('inputTodo')

            if (todoListItem !== "") {
                //initatialisation nettoyage du container
                app.appendChild(todoItemBlocContainer)
                var todoItemBlocContainerX = document.getElementById("todoItemBlocContainer")
                todoItemBlocContainerX.innerHTML = ""

                //on ajoute element dans table puit on vide l'input
                todoListTable.push(todoListItem)
                form.elements["inputTodo"].value = ""

                console.log(todoListTable);

                //affiches des items du tableau
                for (let index = 0; index < todoListTable.length; index++) {
                    const element = todoListTable[index];

                    var todoItemBloc = document.createElement("div")
                    todoItemBloc.id = index

                    var inputTodoItem = document.createElement("input")
                    inputTodoItem.type = "text"
                    inputTodoItem.class = index
                    inputTodoItem.disabled = true
                    inputTodoItem.value = element

                    var inputTodoItemDiv = document.createElement("div")
                    inputTodoItemDiv.appendChild(inputTodoItem)

                    var updateBt = document.createElement("div")
                    updateBt.className = "updateBt"
                    var updateBtContent = document.createTextNode("update")
                    updateBt.appendChild(updateBtContent)

                    var saveBt = document.createElement("div")
                    saveBt.className = "none saveBt"
                    var saveBtContent = document.createTextNode("save")
                    saveBt.appendChild(saveBtContent)

                    var deleteBt = document.createElement("div")
                    deleteBt.className = "deleteBt"
                    var deleteBtContent = document.createTextNode("delete")
                    deleteBt.appendChild(deleteBtContent)

                    todoItemBloc.appendChild(inputTodoItemDiv)
                    todoItemBloc.appendChild(updateBt)
                    todoItemBloc.appendChild(saveBt)
                    todoItemBloc.appendChild(deleteBt)

                    todoItemBlocContainer.appendChild(todoItemBloc)

                    console.log(todoItemBlocContainer);
                }
            }
            //on affiche la todolist
            app.appendChild(todoItemBlocContainer)

            //fonction de gestion maj, suppr, save
            //-->update
            var updateBtClick = document.querySelectorAll(".updateBt")
            console.log(updateBtClick);

            for (let index = 0; index < updateBtClick.length; index++) {
                const element = updateBtClick[index];

                element.addEventListener('click', (e) => {
                    console.log("click sur update");

                    //we show save button and hide update button
                    e.target.classList.toggle("none")
                    document.querySelectorAll(".saveBt")[index].classList.toggle("none")

                    //we turn on false disabled attribut of input in div
                    var divInput = e.target.previousSibling
                    divInput.querySelector("input").disabled = false
                })
            }
            //hide save button and show update
            var saveBtClick = document.querySelectorAll(".saveBt")
            if (saveBtClick) {
                for (let index = 0; index < saveBtClick.length; index++) {
                    const elementSave = saveBtClick[index];

                    elementSave.addEventListener('click', (e) => {
                        console.log("click sur save");
                        //we show save button and hide update button
                        e.target.classList.toggle("none")
                        document.querySelectorAll(".updateBt")[index].classList.toggle("none")

                        //we turn on true disabled attribut
                        var divInput = e.target.previousSibling.previousSibling
                        divInput.querySelector("input").disabled = true

                        //maj dans le tableau des taches
                        var newValue = divInput.querySelector("input").value
                        todoListTable.splice(index, 1, newValue)
                        console.log(todoListTable);
                    })
                }
            }
            //delete todoliste item
            var deleteBtClick = document.querySelectorAll(".deleteBt")
            if (deleteBtClick) {
                for (let index = 0; index < deleteBtClick.length; index++) {
                    const elementDelete = deleteBtClick[index];

                    elementDelete.addEventListener('click', (e) => {
                        console.log("click sur delete");

                        var todoItemBlocDelete = document.getElementsByTagName("div")
                        for (let i = 0; i < todoItemBlocDelete.length; i++) {
                            const element = todoItemBlocDelete[i];
                            if (element.id == index) {
                                element.remove()
                                break;
                            }
                        }

                        //maj dans le tableau des taches
                        todoListTable.splice(index, 1)
                        console.log(todoListTable);

                    })
                }
            }

        })
    }
}



//ecoute des evenements
setListner = () => {
    //--> affiche title
    listnerFunction.showTitle();

    //->affiche champs saisie todo
    listnerFunction.enterTodoListItem();

    //-->affiche element de todo
    listnerFunction.createTodoListeItems()
}
