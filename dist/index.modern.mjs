import { useState } from 'react';

// import styles from './styles.module.css'

function createInputComponent({
  multiple,
  accept
}) {
  const el = document.createElement('input');
  // set input config
  el.type = 'file';
  el.accept = accept;
  el.multiple = multiple;
  // return file input element
  return el;
}
const useFileUpload = () => {
  const [files, setFiles] = useState(null);
  let userCallback = () => {};

  // Handle onChange event
  const onChange = e => {
    const target = e.target;
    const selectedFiles = Array.from(target.files || []);
    const parsedFiles = selectedFiles.map(file => ({
      source: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      file // original file object
    }));

    // remove event listener after operation
    target.removeEventListener('change', onChange);

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
  const uploadFile = ({
    accept,
    multiple
  } = {
    accept: '',
    multiple: false
  }, cb) => {
    if (typeof cb === 'function') {
      userCallback = cb;
    }
    // create virtual input element
    const inputEL = createInputComponent({
      multiple,
      accept
    });
    // add event listener
    inputEL.addEventListener('change', onChange);
    inputEL.click();
  };
  return [files, uploadFile];
};

export { useFileUpload };
//# sourceMappingURL=index.modern.mjs.map
