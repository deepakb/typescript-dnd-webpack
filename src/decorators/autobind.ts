export const autobind = (_: any, _2: string, descriptor: PropertyDescriptor) => {
  const origMethod = descriptor.value;
  const newDesciptor: PropertyDescriptor = {
    configurable: true,
    get() {
      return origMethod.bind(this);
    }
  };
  return newDesciptor;
};
