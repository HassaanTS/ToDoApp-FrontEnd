# ToDoApp-Frontend

### ToDoApp
This application is a digital version of a `ToDo list` that keeps all your 'To Do' tasks in one place. The application comprises of a backend, written in [go-fiber](https://gofiber.io/) with [mongodb](https://www.mongodb.com/) serving as the database service, and a frontend written in [react](https://reactjs.org/). 
With this application you can perform the basic functions of creating, updating and deleting tasks along with marking them done and viewing the list of already created tasks.

### Backend
The backend can be found [here](https://github.com/HassaanTS/ToDoApp-Backend/tree/develop).

### Design
- The application comprises of the input form, the editing form and the viewable 'To Dos'
- The landing page gives the user the option to either create a new 'To Do' by clicking the add button or keep viewing the already present 'To Dos' with the option of sorting, searching or editing them, including marking them completed
- The various event options, like viewing records, adding a new record, editing or deleting a record makes a call to the respective request function which makes a request to the backend and fetches a response


#### Running
The application frontend can be accessed by first installing the dependencies

```
npm install
```

and then running the application
```
npm start
```
