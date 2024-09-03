import { Task } from "../../api";
import { useState, useEffect } from "react";
import { Container, Accordion, Row, Col } from "react-bootstrap";
import { map, size } from "lodash";
import { TaskItem } from "../TaskItem";
import { BasicModal } from "../BasicModal";
import { ITask } from "../../models";
import { TaskForm } from "../TaskForm";

const task = new Task();

export function TaskList() {
  const items = task.obtain();
  const [tasks, setTasks] = useState(items);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<any>({});
  const [reload, setReload] = useState(true);

  if (size(tasks) < size(items)) {
    setTasks(items);
  }

  const openShowModal = () => {
    setShowModal(!showModal);
  };

  const moreInfo = (task: ITask) => {
    setModalInfo({ title: task.title, children: task.description });
    openShowModal();
  };

  const onDelete = (id: string) => {
    const response = task.delete(id);
    setTasks(response);
  };

  const onUpdateTask = (task: ITask) => {
    setModalInfo({
      title: `Editar ${task.title}`,
      children: (
        <TaskForm
          close={() => {
            setShowModal(false);
          }}
          task={task}
        />
      ),
    });
    openShowModal();
  };

  const onCompletedTask = (data: ITask) => {
    const newData = data;
    newData.completed = !data.completed;
    task.update(newData);
    console.log(newData);
    setReload(!reload);
  };

  const renderTasks = (completed: boolean) => {
    return map(tasks, (task) => {
      if (task.completed === completed) {
        return (
          <Col xs={6} md={4} lg={3} key={task.id}>
            <TaskItem
              task={task}
              openInfo={moreInfo}
              onDeleteTask={onDelete}
              onUpdateTask={onUpdateTask}
              onCompletedTask={onCompletedTask}
            ></TaskItem>
          </Col>
        );
      }
    });
  };

  return (
    <>
      <Container>
        <Row>
          {renderTasks(false)}
          <Accordion defaultActiveKey="0" className="tasks-completed">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Tareas Completadas</Accordion.Header>
              <Accordion.Body>
                <Row>{renderTasks(true)}</Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>
      <BasicModal
        show={showModal}
        close={openShowModal}
        title={modalInfo?.title || ""}
        children={modalInfo.children}
      />
    </>
  );
}
