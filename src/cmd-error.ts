export class ECmdError extends Error {

  public code = 'ECMDERR';
  public stderr?: string;
  public stdout?: string;
  public details?: string;
  public status: number;
  public signal: string | null;

  constructor(message: string) {
    super(message);
    this.stack = (new Error()).stack;
  }

}
