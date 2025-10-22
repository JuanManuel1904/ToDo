import Button from './Button';
import TaskEdition from './TaskEdition';
import { useState } from 'react';

const TaskInformation = ({ task, onClose, onDelete, onSave }) => {
  const [showEdit, setShoWEdit] = useState(false);
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      {showEdit && (
        <TaskEdition
          task={task}
          onClose={() => {
            (setShoWEdit(false), onClose());
          }}
          onSave={onSave}
        />
      )}
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
          <h1 className="text-base sm:text-lg font-normal mt-2 break-words">
            {task.title}
          </h1>
        </div>

        <div className="bg-slate-600 rounded-lg p-4">
          <h1 className="text-lg sm:text-xl font-bold mb-2">Descripción</h1>
          <p className="text-sm sm:text-base break-words">{task.description}</p>
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
            text="Completar"
            onClick={onDelete}
            className="w-full sm:w-auto"
          />
          <Button
            color="blue"
            text="Editar"
            onClick={() => setShoWEdit(true)}
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskInformation;
