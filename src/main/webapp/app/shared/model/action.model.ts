import { IBookMarkAction } from 'app/shared/model/book-mark-action.model';
import { ICategory } from 'app/shared/model/category.model';
import { IPracticeSession } from 'app/shared/model/practice-session.model';

export interface IAction {
  id?: number;
  title?: string | null;
  photoUrl?: string | null;
  photoContentType?: string | null;
  photo?: string | null;
  code?: string | null;
  videoContentType?: string | null;
  video?: string | null;
  videoUrl?: string | null;
  masterDescription?: string | null;
  action?: IBookMarkAction | null;
  category?: ICategory | null;
  session?: IPracticeSession | null;
}

export const defaultValue: Readonly<IAction> = {};
