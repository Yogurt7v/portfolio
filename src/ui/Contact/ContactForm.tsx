import React from 'react';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import SubmitButton from './SubmitButton';
import type { ContactFormProps } from '../../types/contacts';
import { useContactForm } from '../../hooks/useContactForm';

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const { status, formRef, handleSubmit } = useContactForm(onSuccess);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <FormInput required name="name" placeholder="Ваше имя" />
      <FormInput required name="email" type="email" placeholder="Email" />
      <FormTextarea required name="message" rows={4} placeholder="Сообщение..." />
      <SubmitButton status={status} />
    </form>
  );
};

export default ContactForm;
