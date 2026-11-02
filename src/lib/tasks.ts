export type TaskStatus = 'todo' | 'doing' | 'done';
export type TaskFilter = 'all' | 'active' | 'done';

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
};

export function createTask(title: string): Task {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    status: 'todo',
    createdAt: new Date().toISOString(),
  };
}

export function addTask(tasks: Task[], title: string): Task[] {
  const trimmed = title.trim();
  if (!trimmed) return tasks;
  return [createTask(trimmed), ...tasks];
}

export function findTask(tasks: Task[], id: string): Task | undefined {
  return tasks.find((task) => task.id === id);
}

export function toggleTask(tasks: Task[], id: string): Task[] {
  const target = findTask(tasks, id);
  if (!target) return tasks;

  return tasks.map((task) =>
    task.id === id
      ? { ...task, status: task.status === 'done' ? 'todo' : 'done' }
      : task,
  );
}

export function removeTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((task) => task.id !== id);
}

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  if (filter === 'active') {
    return tasks.filter((task) => task.status !== 'done');
  }
  if (filter === 'done') {
    return tasks.filter((task) => task.status === 'done');
  }
  return tasks;
}

export function countByStatus(tasks: Task[]): Record<TaskStatus, number> {
  return tasks.reduce(
    (counts, task) => {
      counts[task.status] += 1;
      return counts;
    },
    { todo: 0, doing: 0, done: 0 } as Record<TaskStatus, number>,
  );
}