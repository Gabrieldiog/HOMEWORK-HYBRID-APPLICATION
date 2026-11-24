import { Subject, Task } from '../types/subject';
import { toKey } from '../utils/date';

function inDays(offset: number) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return toKey(date);
}

function task(id: string, title: string, type: Task['type'], dueDate: string, done = false, grade?: number): Task {
  return { id, title, type, dueDate, done, grade };
}

export function seedSubjects(): Subject[] {
  const createdAt = new Date().toISOString();

  return [
    {
      id: 'mobile',
      name: 'Desenvolvimento Mobile',
      teacher: 'Prof. de Híbridos',
      icon: 'phone',
      color: '#24624F',
      createdAt,
      tasks: [
        task('mobile-a1', 'Prova A1', 'prova', inDays(-40), true, 9.5),
        task('mobile-lab', 'Lab de componentes React', 'atividade', inDays(-12), true, 10),
        task('mobile-a2', 'Projeto A2: app Ionic + React (este aqui)', 'trabalho', '2026-12-01')
      ]
    },
    {
      id: 'banco',
      name: 'Banco de Dados',
      teacher: 'Prof. do JOIN',
      icon: 'server',
      color: '#3D5A80',
      createdAt,
      tasks: [
        task('banco-modelo', 'Modelagem do estudo de caso', 'trabalho', inDays(-20), true, 8.5),
        task('banco-prova', 'Prova de SQL', 'prova', inDays(6)),
        task('banco-lista', 'Lista de normalização', 'atividade', inDays(2))
      ]
    },
    {
      id: 'calculo',
      name: 'Cálculo',
      teacher: 'Prof. do Limite',
      icon: 'calculator',
      color: '#E4572E',
      createdAt,
      tasks: [
        task('calculo-lista', 'Lista de derivadas', 'atividade', inDays(-3)),
        task('calculo-prova', 'Prova de integrais (rezando)', 'prova', inDays(10))
      ]
    },
    {
      id: 'engenharia',
      name: 'Engenharia de Software',
      teacher: 'Prof. do Scrum',
      icon: 'people',
      color: '#8E6C8A',
      createdAt,
      tasks: [
        task('eng-requisitos', 'Documento de requisitos', 'trabalho', inDays(-25), true, 9),
        task('eng-sprint', 'Apresentação da sprint', 'trabalho', inDays(4))
      ]
    }
  ];
}
