import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loadSubjects, saveSubjects } from '../services/storage';
import { Subject, SubjectDraft, Task, TaskDraft } from '../types/subject';
import { createId } from '../utils/id';

interface SubjectsContextValue {
  subjects: Subject[];
  ready: boolean;
  addSubject: (draft: SubjectDraft) => Subject;
  removeSubject: (id: string) => void;
  addTask: (subjectId: string, draft: TaskDraft) => void;
  toggleTask: (subjectId: string, taskId: string) => void;
  removeTask: (subjectId: string, taskId: string) => void;
}

const SubjectsContext = createContext<SubjectsContextValue | null>(null);

export const SubjectsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadSubjects()
      .then(setSubjects)
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) saveSubjects(subjects).catch(() => undefined);
  }, [subjects, ready]);

  const updateTasks = useCallback((subjectId: string, change: (tasks: Task[]) => Task[]) => {
    setSubjects((current) =>
      current.map((subject) =>
        subject.id === subjectId ? { ...subject, tasks: change(subject.tasks) } : subject
      )
    );
  }, []);

  const addSubject = useCallback((draft: SubjectDraft) => {
    const subject: Subject = { ...draft, id: createId(), createdAt: new Date().toISOString(), tasks: [] };
    setSubjects((current) => [...current, subject]);
    return subject;
  }, []);

  const removeSubject = useCallback((id: string) => {
    setSubjects((current) => current.filter((subject) => subject.id !== id));
  }, []);

  const addTask = useCallback(
    (subjectId: string, draft: TaskDraft) =>
      updateTasks(subjectId, (tasks) => [...tasks, { ...draft, id: createId(), done: false }]),
    [updateTasks]
  );

  const toggleTask = useCallback(
    (subjectId: string, taskId: string) =>
      updateTasks(subjectId, (tasks) =>
        tasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task))
      ),
    [updateTasks]
  );

  const removeTask = useCallback(
    (subjectId: string, taskId: string) =>
      updateTasks(subjectId, (tasks) => tasks.filter((task) => task.id !== taskId)),
    [updateTasks]
  );

  const value = useMemo(
    () => ({ subjects, ready, addSubject, removeSubject, addTask, toggleTask, removeTask }),
    [subjects, ready, addSubject, removeSubject, addTask, toggleTask, removeTask]
  );

  return <SubjectsContext.Provider value={value}>{children}</SubjectsContext.Provider>;
};

export function useSubjects() {
  const context = useContext(SubjectsContext);
  if (!context) throw new Error('useSubjects precisa estar dentro de SubjectsProvider');
  return context;
}
