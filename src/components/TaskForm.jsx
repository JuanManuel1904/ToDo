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
    const newTask = { title, description, priority };
    addTask(newTask);
    toggleForm();
  };

  const priorityColor = () => {
    switch (color) {
      case 'Urgente':
        return 'bg-rose-500/90';
      case 'Importante':
        return 'bg-orange-500/90';
      case 'Opcional':
        return 'bg-green-500/90';
      default:
        return 'bg-slate-700';
    }
  };

  return (
    <form onSubmit={formSubmit} className="h-full w-full">
      <div className="flex flex-col justify-end p-4 bg-slate-700 rounded-lg h-full gap-y-3 sm:gap-y-4">
        {/* Campos */}
        <div className="text-white flex flex-col text-lg sm:text-xl gap-y-3 sm:gap-y-4 h-full">
          <input
            type="text"
            value={title}
            maxLength={30}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className="border border-slate-500 rounded-lg min-h-[3rem] sm:min-h-[4rem] p-2 w-full"
            required
          />

          <textarea
            maxLength={300}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción"
            className="border border-slate-500 rounded-lg min-h-[6rem] sm:min-h-[11rem] p-2 w-full resize-none"
          />

          <select
            name="priority"
            id="priority"
            onChange={eventColorValue}
            className={`border border-slate-500 rounded-lg min-h-[3rem] sm:min-h-[4rem] p-2 w-full ${priorityColor()}`}
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

        {/* Botones */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-lg sm:text-xl font-bold text-white">
          <Button
            color="green"
            text="Guardar"
            type="submit"
            className="w-full sm:w-auto"
          />
          <Button
            color="rose"
            text="Cancelar"
            type="button"
            onClick={toggleForm}
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
