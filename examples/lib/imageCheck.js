/**
 *
 * @param { File } file
 * @param { Object } [checkOptions]
 * @param { number } [checkOptions.width]
 * @param { number } [checkOptions.maxWidth]
 * @param { number } [checkOptions.height]
 * @param { number } [checkOptions.maxHeight]
 * @param { number } [checkOptions.maxSize]
 * @returns { Promise }
 */
export default function(file, { width, maxWidth, height, maxHeight, maxSize }) {
  if (!maxSize && !width && !height && !maxWidth && !maxHeight) {
    return Promise.resolve();
  }
  if (maxSize && maxSize < file.size) {
    return Promise.reject(new Error("图片大小超过限制", maxSize));
  }
  // 宽度高度校验，需呀生成一张临时图片
  if (width || height) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function(e) {
        const errors = [];
        let src = e.target.result;
        let image = new Image();
        // 加载图片
        image.onload = function() {
          if (width && image.width !== width) {
            errors.push(new Error("图片宽度不符"));
          }
          if (maxWidth && image.width > maxWidth) {
            errors.push(new Error("图片宽度过大"));
          }
          if (height && image.height !== height) {
            errors.push(new Error("图片高度不符"));
          }
          if (maxHeight && image.height > maxHeight) {
            errors.push(new Error("图片高度过大"));
          }
          if (errors.length) {
            reject(errors);
          }
          resolve();
        };
        image.onerror = reject;
        image.src = src;
      };
      reader.readAsDataURL(file);
    });
  }
}
