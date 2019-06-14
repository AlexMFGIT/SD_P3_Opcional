import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // Declaramos las propiedades de la clase
  titulo: string = '';  // El nombre de la nueva tarea
  tasks: Task[];        // La lista con todas mis tareas

  isLoggedIn: boolean = false;

  constructor(private taskService: TaskService) {
    this.isLoggedIn = UserService.isLoggedIn();
    let user = UserService.getCurrentUserID();

    // Solo recuperamos las tarjetas si ha iniciado sesión
    if(this.isLoggedIn) {
      this.taskService.getUserTasks(user).subscribe(tasks => {
        console.log(tasks);
        this.tasks = tasks;
      });
    }
  }

  ngOnInit() {
  }

  addTask(event) {
    event.preventDefault();   // Evita la recarga de la página

    // Creamos la tarea
    const newTask:Task = {
      title: this.titulo,
      isDone: false,
      user: UserService.getCurrentUserID()
    };

    // Subimos la tarea a la BD
    this.taskService.addTask(newTask).subscribe(task => {
      console.log(task);
      this.tasks.push(task);
      this.titulo = '';
    });
  }

  updateStatus(task) {
    // Hacemos una nueva tarea marcada
    const newTask:Task = {
      title: task.title,
      isDone: !task.isDone,
      user: task.user
    };

    // Subimos la tarea a la BD
    this.taskService.updateTask(task._id, newTask).subscribe(result => {
      task.isDone = !task.isDone;
      console.log(result);
    });
  }

  deleteTask(taskId) {
    const response = confirm('Tienes la certeza de querer eliminar esta tarea? :O');

    // Si acepta, borramos la tarea
    if(response) {
      const tasks = this.tasks;

      // Eliminamos la tarea de la BD
      this.taskService.deleteTask(taskId).subscribe(result => {
        console.log(result);
        // Borramos la tarea de la lista solo si se ha eliminado de la bd
        if(result.n === 1)
          for(let i=0; i < tasks.length; i++)
            if(this.tasks[i]._id === taskId)
              this.tasks.splice(i,1);
      });
    }
  }

}
