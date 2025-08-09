import { useState } from 'react';
import Button from './Button';

const TaskForm = ({ toggleForm, addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const [color, setColor] = useState('');

  const eventColorValue = (color) => {
    setColor(color.target.value);
    setPriority(color.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      priority,
    };

    addTask(newTask);
    toggleForm();
  };

  const priorityColor = () => {
    switch (color) {
      case 'Urgente':
        return 'bg-rose-500/90 rounded-lg h-16';
      case 'Importante':
        return 'bg-orange-500/90 rounded-lg h-16';
      case 'Opcional':
        return 'bg-green-500/90 rounded-lg h-16';
      default:
        return 'bg-slate-700 rounded-lg h-16';
    }
  };

  return (
    <>
      <form action="#" onSubmit={formSubmit} className="h-full w-full">
        <div className="flex flex-col justify-end p-4 bg-slate-700 rounded-lg h-full gap-y-4">
          <div className="text-white flex flex-col text-2xl gap-y-4 h-full">
            <input
              type="text"
              value={title}
              maxLength={30}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Titulo"
              className="border border-slate-500 rounded-lg h-16 p-2"
              required
            />

            <textarea
              type="text"
              maxLength={300}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Descripcion"
              className="border border-slate-500 rounded-lg h-44 p-2"
            />

            <select
              name="priority"
              id="priority"
              onChange={eventColorValue}
              className={`border border-slate-500 rounded-lg h-16 p-2 ${priorityColor()}`}
              required
            >
              <option value="" hidden>
                Elige la prioridad
              </option>
              <option value="Urgente" className="bg-rose-500/90">
                Urgente
              </option>
              <option value="Importante" className="bg-orange-500/90">
                Importante
              </option>
              <option value="Opcional" className="bg-green-500/90">
                Opcional
              </option>
            </select>
          </div>
          <div className="flex justify-center-safe text-2xl font-bold gap-4 h-12 text-white">
            <Button color="green" text="Guardar" type="submit" />
            <Button
              color="rose"
              text="Cancelar"
              type="button"
              onClick={toggleForm}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default TaskForm;
