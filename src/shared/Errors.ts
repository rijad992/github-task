class GeneralError {
  className = 'GeneralError';
  status?: number = 500;
  message: string;

  constructor({ message, status }: { message: string; status?: number }) {
    this.message = message;
    this.status = status;
  }
  getErrorReturnValue = ({
    status = 500,
    message = this.message,
  }): { status: number; message: string } => {
    return { status, message };
  };

  getErrorDetails = (): { status: number; message: string } => {
    const ErrorName = this.className;
    switch (ErrorName) {
      case 'BadRequest':
        return this.getErrorReturnValue({ status: 400 });
      case 'NotFound':
        return this.getErrorReturnValue({ status: 404 });
      case 'Forbidden':
        return this.getErrorReturnValue({ status: 403 });
      case 'GithubResponseError':
        return this.getErrorReturnValue({
          status: this.status || 500,
          message: this.message,
        });
      default:
        return this.getErrorReturnValue({
          status: 500,
          message: 'Unrecognized error.',
        });
    }
  };
}

class BadRequest extends GeneralError {
  className = 'BadRequest';
}
class NotFound extends GeneralError {
  className = 'NotFound';
}
class Forbidden extends GeneralError {
  className = 'Forbidden';
}
class GithubResponseError extends GeneralError {
  className = 'GithubResponseError';
}

export { GeneralError, BadRequest, NotFound, Forbidden, GithubResponseError };
