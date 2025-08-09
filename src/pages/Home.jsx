import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import Button from '../components/Button';
import TaskCard from '../components/TaskCard';
import PopUp from '../components/PopUp';

const Home = () => {
  const [taskList, setTaskList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [deleteSelection, setDeleteSelection] = useState(false);
  const [deleteTaskList, setDeleteTaskList] = useState([]);

  const [storageLoaded, setStorageLoaded] = useState(false);

  const [popUp, setPopUp] = useState(false);
  const [infoModal, setInfoModal] = useState(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleDeleteSelection = () => {
    setDeleteSelection(!deleteSelection);
  };

  const addTaskDeleteList = (title) => {
    if (deleteTaskList.includes(title)) {
      const updatedList = deleteTaskList.filter((task) => task !== title);
      setDeleteTaskList(updatedList);
    } else {
      setDeleteTaskList([...deleteTaskList, title]);
    }
    console.log(taskList);
  };

  const individualDelete = () => {
    setTaskList(taskList.filter((task) => task.title !== infoModal.title));
    setInfoModal(null);
    setPopUp(false);
  };

  const multipleDelete = () => {
    const newtaskList = taskList.filter(
      (task) => !deleteTaskList.includes(task.title)
    );
    setTaskList(newtaskList);
    setDeleteTaskList([]);
    toggleDeleteSelection();
  };

  const addTask = (newtask) => {
    const newTaskList = [...taskList];
    newTaskList.push(newtask);
    setTaskList(newTaskList);
  };

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          setTaskList(parsedTasks);
        }
      }
    } catch (error) {
      console.error('Error', error);
      localStorage.removeItem('tasks');
    } finally {
      setStorageLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!storageLoaded) return;

    try {
      localStorage.setItem('tasks', JSON.stringify(taskList));
    } catch (error) {
      console.error('Error', error);
    }
  }, [taskList, storageLoaded]);

  return (
    <>
      <div
        className={
          'main-container bg-slate-800 min-h-screen flex flex-col px-12'
        }
      >
        {popUp && (
          <div>
            <PopUp
              task={infoModal}
              open={popUp}
              onDelete={individualDelete}
              onClose={() => {
                (setPopUp(false), setInfoModal(null));
              }}
            />
          </div>
        )}
        <header className="flex-row place-items-center">
          <h1 className="text-gray-400 text-8xl font-semibold font-sans mt-8 text-shadow-lg text-shadow-gray-800">
            Do It
          </h1>
          <h1 className="text-gray-200 text-lg">We remember for you</h1>
        </header>
        <div className={`${popUp ? 'blur-lg opacity-50 ' : ''}`}>
          <div className="gap-4 min-h-16">
            {!showForm &&
              (deleteSelection ? (
                <div className="flex justify-end-safe text-2xl font-bold gap-4 h-12 text-white">
                  <Button
                    color="rose"
                    className="w-40"
                    text="Eliminar"
                    onClick={multipleDelete}
                  />
                  <Button
                    color="blue"
                    text="Cancelar"
                    onClick={() => {
                      toggleDeleteSelection();
                      setDeleteTaskList([]);
                    }}
                  />
                </div>
              ) : (
                <div className="flex justify-end-safe text-2xl font-bold gap-4 h-12 text-white">
                  <Button color="green" text="Agregar" onClick={toggleForm} />
                  <Button
                    color="rose"
                    text="Eliminar"
                    onClick={() => {
                      toggleDeleteSelection();
                      setDeleteTaskList([]);
                    }}
                  />
                </div>
              ))}
          </div>
          <div className="flex flex-row flex-grow h-full gap-4">
            <main className="w-full mx-auto space-y-6 h-full py-4">
              <section className="bg-slate-700 p-6 rounded-lg shadow-md h-full w-full">
                {taskList.length === 0 ? (
                  <p className="text-center text-gray-400">
                    No tienes tareas aún
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white">
                    {taskList.map((task) => (
                      <TaskCard
                        key={task.title}
                        task={task}
                        deleteSelection={deleteSelection}
                        deleteTaskList={deleteTaskList}
                        addTaskDeleteList={addTaskDeleteList}
                        onClick={() => {
                          (setInfoModal(task), setPopUp(true));
                        }}
                      />
                    ))}
                  </div>
                )}
              </section>
            </main>

            {showForm && (
              <div className="w-1/3 py-4 h-full">
                <TaskForm toggleForm={toggleForm} addTask={addTask} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
