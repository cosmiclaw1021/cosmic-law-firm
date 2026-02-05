import { useState, type FormEvent } from 'react';

export const useContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Basic client-side validation check
    if (!data.email || !data.name || !data.message) {
      setError('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error || 'Failed to send your message.');
      }

      setIsSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again later.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setError(null);
  };

  return {
    isSubmitted,
    isLoading,
    error,
    handleSubmit,
    resetForm
  };
};
