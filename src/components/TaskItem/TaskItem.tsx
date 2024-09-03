import { PropsType } from "./TaskItem.types";
import { Card, Button } from "react-bootstrap";
import { FiEdit3, FiTrash2, FiCheckCircle, FiCircle } from "react-icons/fi";
import "./TaskItem.scss";
import classNames from "classnames";

export function TaskItem(props: PropsType) {
  const { task, openInfo, onDeleteTask, onUpdateTask, onCompletedTask } = props;
  const onOpen = () => openInfo(task);
  const onDelete = () => onDeleteTask(task.id);
  const onUpdate = () => onUpdateTask(task);
  const onCompleted = () => onCompletedTask(task);
  return (
    <div className="task-item">
      <Card>
        <Card.Header className={classNames({ completed: task.completed })}>
          <p className="title">{task.title}</p>
          <p className="time">{new Date(task.date).toLocaleDateString()}</p>
        </Card.Header>
        <Card.Body>
          <Card.Text onClick={onOpen}>{task.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="actions" onClick={onCompleted}>
            {task.completed ? <FiCheckCircle /> : <FiCircle />}
          </div>
          <div>
            <Button onClick={onUpdate}>
              <FiEdit3 />
            </Button>
            <Button variant="danger" onClick={onDelete}>
              <FiTrash2 />
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
