import { BaseControler } from '../models/BaseController.model';
import { Http } from '../enums/http.enum';

function Get(
  _target: BaseControler,
  key: PropertyKey,
  descriptor: PropertyDescriptor,
): PropertyDescriptor {
  const fn = descriptor.value;
  return {
    configurable: true,

    get(): () => void {
      const boundFn = fn.bind(this);
      Reflect.defineProperty(this, key, {
        value: boundFn,
        configurable: true,
        writable: true,
      });

      Object.defineProperty(boundFn, 'httpMethod', {
        writable: false,
        configurable: false,
        value: Http.GET,
      });

      return function () {
        return boundFn.apply(this);
      };
    },
  };
}

export { Get };
