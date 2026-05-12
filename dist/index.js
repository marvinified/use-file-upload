var react = require('react');

// import styles from './styles.module.css'

function createInputComponent(_ref) {
  var multiple = _ref.multiple,
    accept = _ref.accept;
  var el = document.createElement('input');
  // set input config
  el.type = 'file';
  el.accept = accept;
  el.multiple = multiple;
  // return file input element
  return el;
}
var useFileUpload = function useFileUpload() {
  var _useState = react.useState(null),
    files = _useState[0],
    setFiles = _useState[1];
  var userCallback = function userCallback() {};

  // Handle onChange event
  var _onChange = function onChange(e) {
    var target = e.target;
    var selectedFiles = Array.from(target.files || []);
    var parsedFiles = selectedFiles.map(function (file) {
      return {
        source: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        file: file // original file object
      };
    });

    // remove event listener after operation
    target.removeEventListener('change', _onChange);

    // remove input element after operation
    target.remove();

    // update files state hook

    if (target.multiple) {
      setFiles(parsedFiles);
      return userCallback(parsedFiles);
    }
    setFiles(parsedFiles[0]);
    return userCallback(parsedFiles[0]);

    // user specified callback
  };

  // Handle upload
  var uploadFile = function uploadFile(_temp, cb) {
    var _ref2 = _temp === void 0 ? {
        accept: '',
        multiple: false
      } : _temp,
      accept = _ref2.accept,
      multiple = _ref2.multiple;
    if (typeof cb === 'function') {
      userCallback = cb;
    }
    // create virtual input element
    var inputEL = createInputComponent({
      multiple: multiple,
      accept: accept
    });
    // add event listener
    inputEL.addEventListener('change', _onChange);
    inputEL.click();
  };
  return [files, uploadFile];
};

exports.useFileUpload = useFileUpload;
//# sourceMappingURL=index.js.map
