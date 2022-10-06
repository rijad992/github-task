import { Http } from '../enums/http.enum';

function Get(_target, key, descriptor) {
  let fn = descriptor.value;

  return {
    configurable: true,

    get() {
      let boundFn = fn.bind(this);
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
        return boundFn.apply(this, arguments);
      };
    },
  };
}

export { Get };
