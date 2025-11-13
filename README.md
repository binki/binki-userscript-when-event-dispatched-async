# Usage

Include this in your userscript using [`@require`](https://wiki.greasespot.net/Metadata_Block#.40require). It is recommended to [use a permalink](https://docs.github.com/repositories/working-with-files/using-files/getting-permanent-links-to-files) instead of referring to `master`.

```js
// ==UserScript==
// @name example
// @version 1.0
// @require ttps://github.com/binki/binki-userscript-when-event-dispatched-async/raw/master/binki-userscript-when-event-dispatched-async.js
// ==UserScript==

(async () => {
  while (true) {
    await whenEventDispatchedAsync(window, 'hashchange');
    console.log(`The URI is now ${window.location.href}`);
  }
})();
```

# API

```js
whenEventDispatchedAsync(eventTarget, type, handleEvent, options);
```

Parameters:

* `eventTarget` is the [`EventTarget`](https://dom.spec.whatwg.org/#interface-eventtarget) whose [`addEventListener`](https://dom.spec.whatwg.org/#dom-eventtarget-addeventlistener) and [`removeEventListener`](https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener) methods are called.
* `type` is the name of the event.
* `handleEvent` (optional) is a function. If supplied, this is passed the event. The function can return `false` to indicate that the wait should continue. Since the `Event` object may only be inspected when handling the event, this must be done here.
* `options` (optional) is an [`AddEventListenerOptions`](https://dom.spec.whatwg.org/#dictdef-addeventlisteneroptions) object. This can be used to specify things like [`capture`](https://dom.spec.whatwg.org/#dom-eventlisteneroptions-capture). [`passive`](https://dom.spec.whatwg.org/#dom-addeventlisteneroptions-passive) is automatically set to `true` if no `eventHandler` is supplied. [`signal`](https://dom.spec.whatwg.org/#dom-addeventlisteneroptions-signal) is supported and will result in the returned `Promise` being rejected if the signal is fired.
