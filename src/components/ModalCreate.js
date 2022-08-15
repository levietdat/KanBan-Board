import React, { useState } from "react";

const ModalCreate = (props) => {
  const handleClose = () => {
    props.setShow({ show: false });
    props.setActive(true);
  };
  const handleAdd = () => {
    if (props.author !== "" && props.work !== "") {
      props.setNewTodo([
        ...props.newtodo,
        {
          author: props.author,
          work: props.work,
          id: Math.random() * 100000,
        },
      ]);
      props.setAuthor("");
      props.setWork("");
    } else return;
  };
  const handleChangeAuthor = (e) => {
    props.setAuthor(e.target.value);
  };
  const handleChangeWork = (e) => {
    props.setWork(e.target.value);
  };
  const handleUpdate = (e) => {
      if (props.update === "todo-block") {
        props.setNewTodo([
          ...props.newtodo.filter(
            (todo) => parseFloat(todo.id) !== parseFloat(props.idUpdate)
          ),
          {
            author: props.author,
            work: props.work,
            id: props.idUpdate,
          },
        ]);
        props.setWork("");
        props.setAuthor("");
      }
      // else 
      if (props.update === "inprogress-block") {
        console.log("inprogress-block block")
          props.setInprogress([
            ...props.inprogress.filter(
              (todo) => parseFloat(todo.id) !== parseFloat(props.idUpdate)
            ),
            {
              author: props.author,
              work: props.work,
              id: props.idUpdate,
            }
          ]);
        props.setWork("");
        props.setAuthor(""); 
      }

      if (props.update === "completed-block") {
        console.log("completed block")
          props.SetCompleted([
            ...props.completed.filter(
              (todo) => parseFloat(todo.id) !== parseFloat(props.idUpdate)
            ),
            {
              author: props.author,
              work: props.work,
              id: props.idUpdate,
            },
          ]);

        props.setWork("");
        props.setAuthor("");
      }
    props.setActive(true);
    props.setShow({ show: false });
  };
  return (
    <>
      <div
        className={
          props.show.show ? "modal display-block" : "modal display-none"
        }
      >
        <input
          onChange={handleChangeAuthor}
          value={props.author}
          className="author"
          type="text"
          placeholder="Author"
        ></input>
        <input
          onChange={handleChangeWork}
          value={props.work}
          className="task-work"
          type="text"
          placeholder="Task-work...."
        ></input>
        <div>
          <button
            onClick={handleAdd}
            type="button"
            className={props.active ? "btn-add active" : "btn-add hide"}
          >
            ADD
          </button>
          <button
            onClick={handleClose}
            type="button"
            className={props.active ? "btn-close active" : "btn-close hide"}
          >
            X
          </button>
          <button
            onClick={handleUpdate}
            type="button"
            className={props.active ? "btn-put hide" : "btn-put active"}
          >
            Update
          </button>
          <button
            onClick={handleClose}
            type="button"
            className={props.active ? "btn-close hide" : "btn-close active"}
          >
            X
          </button>
        </div>
      </div>
    </>
  );
};
export default ModalCreate;
