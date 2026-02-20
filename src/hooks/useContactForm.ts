import { useState, useRef, type FormEvent } from 'react';
import type { FormStatus } from '../types/contacts';
import { ERROR_DELAY, FORM_ENDPOINT, SUCCESS_DELAY } from '../utils/constants';

export const useContactForm = (onSuccess?: () => void) => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const resetForm = () => {
    formRef.current?.reset();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onSuccess?.();
          setStatus('idle');
          resetForm();
        }, SUCCESS_DELAY);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), ERROR_DELAY);
    }
  };

  return {
    status,
    formRef,
    handleSubmit,
  };
};
