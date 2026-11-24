import {
  book,
  brush,
  calculator,
  codeSlash,
  earth,
  flask,
  language,
  people,
  phonePortrait,
  server
} from 'ionicons/icons';
import { SubjectIconKey, TaskType } from '../types/subject';

export const SUBJECT_ICONS: Record<SubjectIconKey, string> = {
  book,
  calculator,
  code: codeSlash,
  flask,
  globe: earth,
  brush,
  language,
  people,
  server,
  phone: phonePortrait
};

export const SUBJECT_COLORS = ['#24624F', '#F2A541', '#E4572E', '#3D5A80', '#8E6C8A', '#2A9D8F'];

export const TASK_TYPES: Record<TaskType, string> = {
  prova: 'Prova',
  trabalho: 'Trabalho',
  atividade: 'Atividade'
};
