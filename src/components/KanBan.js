import React, { useRef, useState } from "react";
import ModalCreate from "./ModalCreate";
const KanBan = (props) => {
  const ref = useRef();
  const [task, setTask] = useState([]);
  const onDragStart = (e) => {
    e.dataTransfer.setData("div", e.target.id);
    const id = e.target.id;
    const author = e.target.children[0].textContent;
    const work = e.target.children[1].textContent;
    e.target.addClassName("opacity")
    setTask([{ author: author, work: work, id: id }]);
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDrop = (e) => {
    e.preventDefault();
    const child = e.target;
    const parent = child.parentNode;
    const grandFather = parent.parentNode;
    if (
      child.getAttribute("class") === "inprogress-block" ||
      parent.getAttribute("class") === "inprogress-block" ||
      grandFather.getAttribute("class") === "inprogress-block"
    ) {
      task.map((task) => {
        if (
          !props.inprogress.map((inprogress) => inprogress.id).includes(task.id)
        ) {
          props.setInprogress([...props.inprogress, task]);
          console.log(task.id)
          props.setNewTodo([
            ...props.newtodo.filter((item) => parseFloat(item.id) !== parseFloat(task.id)),
          ]);
          props.setCompleted([
            ...props.completed.filter((item) => parseFloat(item.id) !== parseFloat(task.id)),
          ]);
        }
      });
    } 
    if (
      child.getAttribute("class") === "completed-block" ||
      parent.getAttribute("class") === "completed-block" ||
      grandFather.getAttribute("class") === "completed-block"
    ) {
      task.map((task) => {
        if (
            !props.completed.map((completed) => completed.id).includes(task.id)
        ) {
          props.setCompleted([...props.completed, task]);
          props.setNewTodo([
            ...props.newtodo.filter((item) => parseFloat(item.id) !== parseFloat(task.id)),
          ]);
          props.setInprogress([
            ...props.inprogress.filter((item) => parseFloat(item.id) !== parseFloat(task.id)),
          ]);
        }
      });
      
    }
    if (
      child.getAttribute("class") === "todo-block" ||
      parent.getAttribute("class") === "todo-block" ||
      grandFather.getAttribute("class") === "todo-block"
    ) {
      task.map((task) => {
        if (
            !props.newtodo.map((newtodo) => parseFloat(newtodo.id)).includes(parseFloat(task.id))
        ) {
          props.setNewTodo([...props.newtodo, task]);
          props.setInprogress([
            ...props.inprogress.filter((item) => parseFloat(item.id) !== parseFloat(task.id)),
          ]);
          props.setCompleted([
            ...props.completed.filter((item) => parseFloat(item.id) !== parseFloat(task.id)),
          ]);
        }
      });
      
    }
  };
  const hanleDelete =(e)=> {
    const child = e.target;
    const parent = child.parentNode;
    const grandFather = parent.parentNode;
    const id  =parent.getAttribute("id");

    if(grandFather.getAttribute("class")==="todo-block") {
      props.setNewTodo([
        ...props.newtodo.filter((item) => parseFloat(item.id) !== parseFloat(id)),
      ]);
    }
    if(grandFather.getAttribute("class")==="inprogress-block") {
      props.setInprogress([
        ...props.inprogress.filter((item) => parseFloat(item.id) !== parseFloat(id)),
      ]);
    }
    if(grandFather.getAttribute("class")==="completed-block") {
      props.setCompleted([
        ...props.completed.filter((item) => parseFloat(item.id) !== parseFloat(id)),
      ]);
    }
  }
     
 
  return (
    <>
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="todo-block"
        ref={ref}
      >
        <h4 className="title-work">To do</h4>
        {props.newtodo.map((todo) => {
          return (
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="draggable"
              onDragStart={onDragStart}
              draggable="true"
              id={todo.id}
            >
              <p className="author">{todo.author} </p>
              <p className="work">{todo.work} </p>
              <button onClick={hanleDelete} className="btn-delete"> X </button>
              <button onClick={props.handleUpdate} className="btn-update">Sửa</button>
            </div>
          );
        })}
      </div>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="inprogress-block"
        ref={ref}
      >
        <h4 className="title-work">In-Progress</h4>

        {props.inprogress.map((todo) => {
          return (
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="draggable"
              onDragStart={onDragStart}
              draggable="true"
              id={todo.id}
            >
              <p className="author">{todo.author} </p>
              <p className="work">{todo.work} </p>
              <button onClick={hanleDelete} className="btn-delete"> X </button>
              <button onClick={props.handleUpdate} className="btn-update">Sửa</button>
            </div>
          );
        })}
      </div>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="completed-block"
        ref={ref}
      >
        <h4 className="title-work">Completed</h4>
        {props.completed.map((todo) => {
          return (
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="draggable"
              onDragStart={onDragStart}
              draggable="true"
              id={todo.id}
            >
              <p className="author">{todo.author} </p>
              <p className="work">{todo.work} </p>
              <button onClick={hanleDelete} className="btn-delete"> X </button>
              <button onClick={props.handleUpdate} className="btn-update">Sửa</button>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default KanBan;
