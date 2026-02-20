export interface Certificate {
  id: string | number;
  preview: string; // миниатюра для карточки
  source: string; // полноразмерное изображение
  name: string;
  issuer: string;
  date?: string; // опционально
}
