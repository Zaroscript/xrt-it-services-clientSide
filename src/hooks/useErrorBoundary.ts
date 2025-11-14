'use client';

import { useCallback, useState } from 'react';

export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((error: unknown) => {
    if (error instanceof Error) {
      setError(error);
    } else if (error) {
      setError(new Error(String(error)));
    } else {
      setError(new Error('An unknown error occurred'));
    }
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  if (error) {
    throw error;
  }

  return { handleError, resetError };
}

export function useErrorHandler() {
  const { handleError } = useErrorBoundary();
  return handleError;
}
