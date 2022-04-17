declare global {
  namespace NodeJS {
    interface Process {
      _original(): Process;
    }
  }
}

process._original = (function (_original) {
  return function () {
    return _original
  }
})(process);

export default async function (): Promise<void> {
  process._original = (function (_original) {
    return function () {
      return _original
    }
  })(process);
}
