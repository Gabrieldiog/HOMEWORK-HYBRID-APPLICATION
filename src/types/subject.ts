export type SubjectIconKey =
  | 'book'
  | 'calculator'
  | 'code'
  | 'flask'
  | 'globe'
  | 'brush'
  | 'language'
  | 'people'
  | 'server'
  | 'phone';

export type TaskType = 'prova' | 'trabalho' | 'atividade';

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  dueDate: string;
  done: boolean;
  grade?: number;
}

export interface Subject {
  id: string;
  name: string;
  teacher: string;
  icon: SubjectIconKey;
  color: string;
  createdAt: string;
  tasks: Task[];
}

export type SubjectDraft = Pick<Subject, 'name' | 'teacher' | 'icon' | 'color'>;

export type TaskDraft = Pick<Task, 'title' | 'type' | 'dueDate'>;
