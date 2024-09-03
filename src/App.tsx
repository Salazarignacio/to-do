import { NavBardo, TaskForm, BasicModal, TaskList } from "./components";
import { useState } from "react";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const openCloseModal = () => setShowModal(!showModal);
  return (
    <div>
      <NavBardo openCloseModal={openCloseModal}></NavBardo>
      <TaskList></TaskList>
      <BasicModal
        show={showModal}
        close={openCloseModal}
        title="Nueva Tarea"
        children={<TaskForm close={openCloseModal} />}
      ></BasicModal>
    </div>
  );
}
