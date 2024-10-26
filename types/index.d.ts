import 'react';

// Declared to allow Custom HTML attribute wobble, which is used for Cards wrong choice
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    wobble?: number;
  }
}
