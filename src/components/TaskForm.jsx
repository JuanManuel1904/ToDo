import { useState } from 'react';
import Button from './Button';

const TaskForm = ({ toggleForm, addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Normal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title, description, priority });
    toggleForm();
    setTitle('');
    setDescription('');
    setPriority('Normal');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-slate-700 p-4 sm:p-6 rounded-lg shadow-lg w-full"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white text-center">
        Nueva Tarea
      </h2>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-3 text-base sm:text-lg rounded-md bg-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-3 text-base sm:text-lg rounded-md bg-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 min-h-[6rem]"
      />

      <select
        onChange={(e) => setPriority(e.target.value)}
        className={`p-3 text-base sm:text-lg rounded-md text-white focus:outline-none focus:ring-2
          ${
            priority === 'Urgente'
              ? 'bg-rose-500 focus:ring-rose-300'
              : priority === 'Importante'
                ? 'bg-orange-500 focus:ring-orange-300'
                : 'bg-green-500 focus:ring-green-300'
          }`}
      >
        <option value="Normal" className="bg-green-500 text-white">
          Normal
        </option>
        <option value="Importante" className="bg-orange-500 text-white">
          Importante
        </option>
        <option value="Urgente" className="bg-rose-500 text-white">
          Urgente
        </option>
      </select>

      <div className="flex flex-col sm:flex-row gap-2 mt-2">
        <Button type="submit" color="green" text="Guardar" className="w-full" />
        <Button
          type="button"
          color="rose"
          text="Cancelar"
          onClick={toggleForm}
          className="w-full"
        />
      </div>
    </form>
  );
};

export default TaskForm;
