export interface IOAuthProvider {
  verifyToken(token: string): Promise<any>;
}