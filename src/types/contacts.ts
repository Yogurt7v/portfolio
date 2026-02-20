export type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ContactFormProps {
  onSuccess?: () => void; // колбэк после успешной отправки
}

export interface SubmitButtonProps {
  status: FormStatus;
}

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // опционально, если нужна подпись
}

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}
