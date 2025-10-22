import Button from './Button';
import { useState } from 'react';

const TaskEdition = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  return (
    <div className="fixed inset-0  flex justify-center items-center z-50 p-4">
      <div
        className="bg-slate-700 p-4 rounded-lg shadow-xl shadow-slate-900 w-full max-w-lg 
                   text-white h-auto max-h-[90vh] flex flex-col gap-4 overflow-y-auto"
      >
        <div className="bg-slate-600 rounded-lg p-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h1 className="text-lg sm:text-xl font-bold">Título</h1>
            <span
              className={`text-sm sm:text-base font-bold px-2 py-1 rounded-full
                ${
                  task.priority === 'Urgente'
                    ? 'bg-rose-500/90'
                    : task.priority === 'Importante'
                      ? 'bg-orange-500/90'
                      : 'bg-green-500/90'
                }`}
            >
              {task.priority}
            </span>
          </div>
          <input
            type="text"
            defaultValue={task.title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-base sm:text-lg font-normal mt-2 break-words w-full p-2 bg-slate-600 rounded-md focus: outline-none"
          />
        </div>

        <div className="bg-slate-600 rounded-lg p-4">
          <h1 className="text-lg sm:text-xl font-bold mb-2">Descripción</h1>
          <textarea
            defaultValue={task.description}
            onChange={(e) => setDescription(e.target.value)}
            className="text-sm sm:text-base break-words w-full p-2 bg-slate-600 rounded-md focus: outline-none"
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-lg sm:text-xl font-bold">
          <Button
            color="rose"
            text="Cerrar"
            onClick={onClose}
            className="w-full sm:w-auto"
          />
          <Button
            color="green"
            text="Guardar"
            onClick={() => {
              const updateTask = {
                ...task,
                title,
                description,
              };
              onSave(updateTask);
              onClose();
            }}
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskEdition;
