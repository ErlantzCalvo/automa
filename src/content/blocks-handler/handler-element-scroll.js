import { handleElement } from '../helper';

function elementScroll(block) {
  function incScrollPos(element, data, vertical = true) {
    let currentPos = vertical ? element.scrollTop : element.scrollLeft;

    if (data.incY) {
      currentPos += data.scrollY;
    } else if (data.incX) {
      currentPos += data.scrollX;
    }

    return currentPos;
  }

  return new Promise((resolve) => {
    const { data } = block;
    const behavior = data.smooth ? 'smooth' : 'auto';

    handleElement(block, (element) => {
      if (data.scrollIntoView) {
        element.scrollIntoView({ behavior, block: 'center' });
      } else {
        element.scroll({
          behavior,
          top: data.incY ? incScrollPos(element, data) : data.scrollY,
          left: data.incX ? incScrollPos(element, data, false) : data.scrollX,
        });
      }
    });

    window.dispatchEvent(new Event('scroll'));

    resolve('');
  });
}

export default elementScroll;
