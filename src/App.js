import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Todos from './components/Todos';
import dayjs from 'dayjs';

function App() {

    const todoData = [
        {
            _id: 1,
            title: 'Read boyd language book',
            status: false,
            deadline: dayjs('2020-09-18T17:11:54'),
        },
        {
            _id: 2,
            title: 'Do My Home Work',
            status: true,
            deadline: dayjs('2012-02-18T10:16:04'),
        },
        {
            _id: 3,
            title: 'create mini project react',
            status: false,
            deadline: dayjs('2018-08-18T21:11:54'),
        },
    ];

    const [listTasks, setListTasks] = useState(todoData);
    const [showListTasks, setShowListTasks] = useState([]);
    const [modeSort, setModeSort] = useState('All');

    const handleSubmit = (task) => {

        if (!task.title || task.title.trim() === '') {
            console.error('Error: se intentó agregar una tarea vacía');
            return;
        }

        console.log('Intentando agregar tarea:', task);

        setListTasks([
            ...listTasks,
            {
                ...task,
            }
        ]);

        console.info('Tarea agregada correctamente');
    };

    const handleDelete = (_id) => {

        console.log(`Intentando eliminar tarea con ID: ${_id}`);

        setListTasks(
            listTasks.filter(t => t._id !== _id)
        );

        console.info(`Tarea eliminada correctamente. ID: ${_id}`);
    };

    const handleCheck = (task) => {

        console.log(`Cambiando estado de la tarea: ${task.title}`);

        setListTasks(
            listTasks.map(t => {
                if (t._id === task._id) {

                    console.info(
                        `Estado actualizado para: ${task.title}`
                    );

                    return {
                        ...task,
                        status: !task.status,
                    };
                } else {
                    return t;
                }
            })
        );
    };

    const handleEdit = (task) => {

        console.log(`Editando tarea: ${task.title}`);

        setListTasks(
            listTasks.map(t => {
                if (t._id === task._id) {
                    console.info(`Tarea editada correctamente: ${task.title}`);
                    return task;
                } else {
                    return t;
                }
            })
        );
    };

    const handleSortList = (mode) => {
        console.log(`Filtro seleccionado: ${mode}`);
        setModeSort(mode);
    };

    useEffect(() => {

        console.log('Lista de tareas actualizada', listTasks);

        if (modeSort === 'All') {
            setShowListTasks(listTasks);
        } else if (modeSort === 'Incomplete') {
            let sortedListTasks = listTasks.filter(t => !t.status);
            setShowListTasks(sortedListTasks);
        } else {
            let sortedListTasks = listTasks.filter(t => t.status);
            setShowListTasks(sortedListTasks);
        }

    }, [listTasks, modeSort]);

    return (
        <div className="flex flex-col items-center w-full h-full bg-white my-10 gap-6">
            <h1 className="text-4xl font-bold uppercase text-gray-600">
                ToDo List
            </h1>

            <Header
                handleSubmit={handleSubmit}
                sortHandler={handleSortList}
            />

            <Todos
                tasks={showListTasks}
                checkHandler={handleCheck}
                deleteHandler={handleDelete}
                editeHandler={handleEdit}
            />
        </div>
    );
}

export default App;