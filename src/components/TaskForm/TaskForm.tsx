import { useState, FormEvent } from "react";
import { Task } from "../../api";
import { Button, Form } from "react-bootstrap";
import classNames from "classnames";
import { PropsTypes } from "./TaskForms.types";
import "./TaskForm.scss";

const taskActions = new Task();

export function TaskForm(props: PropsTypes) {
  const { close, task } = props;
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [error, setError] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    if (title) {
      if (task) {
        const updateTask = { ...task, title, description };
        taskActions.update(updateTask);
      }
      taskActions.create({ title, description });
      close();
    } else {
      setError(true);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Control
        type="text"
        placeholder="Titulo de la tarea"
        className={classNames("mb-3", { error: error })}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Form.Control
        as="textarea"
        placeholder="decripcion de la tarea"
        className="mb-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="d-grid gap-2">
        <Button type="submit">{task ? "Editar" : "Crear"}</Button>
      </div>
    </Form>
  );
}
