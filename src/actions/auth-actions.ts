'use server';

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get('email');
    const password = formData.get('password');
    const callbackUrl = formData.get('callbackUrl')?.toString() || '/profile';

    if (!email || !password) {
      return 'Please provide both email and password';
    }

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      return 'Invalid credentials';
    }

    return 'Success';
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials';
        default:
          return 'Something went wrong';
      }
    }
    throw error;
  }
}
