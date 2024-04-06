/**
 * @param eventTarget{EventTarget} The object whose event will be subscribed.
 * @param type{String} The type of event to subscribe to.
 * @param handleEvent{Function} (Optional) If supplied, a function which handles the event and returns true if the wait should proceed.
 * @param options{AddEventListenerOptions} (Optional) If supplied, an object which specifies listener options. The signal property is supported. If specifying handleEvent, pass passive.
 */
const whenEventDispatchedAsync = (() => {
  return (eventTarget, type, handleEvent, options) => {
    // Need a shallow copy so that removeListener has the same options.
    options = options ? {...options} : {};
    if (!handleEvent && options.passive === undefined) {
      options.passive = true;
    }
    return new Promise((resolve, reject) => {
      function removeAbortHandler() {
        options.signal.removeEventListener('abort', abortHandler);
      }
      function abortHandler() {
        // No need to unsubscribe from the event itself in the event of cancellation—the browser will do that for us.
        //
        // However, we do need to unsubscribe from the abort signal.
        removeAbortHandler();
        reject(options.signal.reason);
      }
      function handler() {
        if (handleEvent && handleEvent.apply(this, arguments) === false) {
          return;
        }
        eventTarget.removeEventListener(type, handler, options);
        if (options.signal) {
          removeAbortHandler();
        }
        resolve();
      };
      if (options.signal) {
        options.signal.throwIfAborted();
        options.signal.addEventListener('abort', abortHandler);
      }
      eventTarget.addEventListener(type, handler, options);
    });
  };
})();
