import { useState, type FormEvent } from 'react';
import {
  addTask,
  filterTasks,
  removeTask,
  toggleTask,
  type Task,
  type TaskFilter,
} from './lib/tasks';
import './App.css';

const filterLabels: Record<TaskFilter, string> = {
  all: '全部',
  active: '未完成',
  done: '已完成',
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');

  const visibleTasks = filterTasks(tasks, filter);
  const doneCount = tasks.filter((task) => task.status === 'done').length;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;

    setTasks((current) => addTask(current, title));
    setTitle('');
  }

  return (
    <main className="app">
      <h1>Task App</h1>
      <p className="summary">
        共 {tasks.length} 个任务，已完成 {doneCount} 个
      </p>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="输入任务，按回车添加"
          aria-label="任务标题"
        />
        <button type="submit">添加</button>
      </form>

      <div className="filters" role="group" aria-label="任务筛选">
        {(Object.keys(filterLabels) as TaskFilter[]).map((key) => (
          <button
            key={key}
            type="button"
            className={filter === key ? 'active' : ''}
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
          >
            {filterLabels[key]}
          </button>
        ))}
      </div>

      {visibleTasks.length === 0 ? (
        <p className="empty">暂无任务</p>
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => (
            <li key={task.id} className={task.status === 'done' ? 'done' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={task.status === 'done'}
                  onChange={() =>
                    setTasks((current) => toggleTask(current, task.id))
                  }
                />
                <span>{task.title}</span>
              </label>
              <button
                type="button"
                className="delete"
                onClick={() =>
                  setTasks((current) => removeTask(current, task.id))
                }
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}