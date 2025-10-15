// src/domain/auth/authErrorMapper.ts
export function mapFirebaseError(code?: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'E-mail inválido.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'E-mail ou senha incorretos.';
    case 'auth/email-already-in-use':
      return 'Este e-mail já está sendo usado.';
    default:
      return 'Ocorreu um erro inesperado.';
  }
}
