export interface IAuthStrategy {
  validate(...args: any[]): Promise<any>;
}