import "./App.css";
import { useEffect, useState } from "react";
import KanBan from "./components/KanBan";
import ModalCreate from "./components/ModalCreate";
function App() {
  const [newtodo, setNewTodo] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [show, setShow] = useState({ show: false });
  const [author, setAuthor] = useState("");
  const [work, setWork] = useState("");
  const [active, setActive] = useState(true);
  const [update,setUpdate]  = useState([])
  const [idUpdate,setIdUpdate] = useState()
  const showAddTask = () => {
    setShow({ show: true });
    setActive(true);
    setAuthor("")
    setWork("")
  };
  const setnew = (item) => {
    console.log("todo", item);
    setNewTodo(item);
  };
  const testnNewInProgress = (item) => {
    setInprogress(item);
    console.log("inprogress", item);
  };
  const SetCompleted = (item) => {
    setCompleted(item);
    console.log("completed", item);
  };
  const handleUpdate = (e) => {
    setUpdate(e.target.parentNode.parentNode.getAttribute("class"))
    const child = e.target;
    const parent = child.parentNode;
    const grandFather = parent.parentNode;
    const id  =parent.getAttribute("id");
    setIdUpdate(id)
    const author = parent.children[0].textContent;
    const work = parent.children[1].textContent;
    setShow({show:true})
    setAuthor(author)
    setWork(work)
    setActive(false)
  }
  
  return (
    <>
      <h1 className="title  ">KANBAN UI</h1>
      <button type="button" onClick={showAddTask} className="btn-create">
        Add Todo
      </button>
      <div className="kanban">
        <KanBan
        handleUpdate = {handleUpdate}
          newtodo={newtodo}
          setNewTodo={setnew}
          inprogress={inprogress}
          completed={completed}
          setInprogress={testnNewInProgress}
          setCompleted={SetCompleted}
          show={show}
          setShow={setShow}
          setAuthor={setAuthor}
          setWork={setWork}
          setActive={setActive}
          active={active}
           setUpdate={setUpdate}
          update={update}
          setIdUpdate={setIdUpdate}
          idUpdate={idUpdate}
        />
        <ModalCreate
            setIdUpdate={setIdUpdate}
          idUpdate={idUpdate}
          setActive={setActive}
          active={active}
          setNewTodo={setNewTodo}
          newtodo={newtodo}
          work={work}
          setWork={setWork}
          author={author}
          inprogress={inprogress}
          SetCompleted={SetCompleted}
          setUpdate={setUpdate}
          update={update}
          completed={completed}
          setInprogress={setInprogress}
          setAuthor={setAuthor}
          show={show}
          setShow={setShow}
        />
      </div>
    </>
  );
}

export default App;
