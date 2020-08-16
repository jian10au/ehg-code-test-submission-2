import Color from "./classes/Color";
import Pixel from "./classes/Pixel";
import { randInt } from "./helperFunctions";

const draw = (ctx) => {
  const startings = 5;
  const pixels = [];
  const colors = [];
  const randomFactor = 40;
  const redFactor = 0.5;
  const blueFactor = 0.5;
  const greenFactor = 0.5;
  const processes = 200;
  const pixelsIn = {};
  const delay = 0;

  Array.prototype.min = function () {
    return Math.min.apply(null, this);
  };

  Object.size = function (obj) {
    let size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  //   draw each pixel
  const addPixel = (pixel) => {
    pixels.push(pixel);
    pixelsIn[pixel.x + "x" + pixel.y] = 1;
    const color = pixel.color;
    ctx.fillStyle =
      "rgb(" + color.red + "," + color.blue + "," + color.green + ")";
    ctx.fillRect(pixel.x, pixel.y, 1, 1);
  };

  // if pixels array is not empty, recursively call the proceed function
  const proceed = () => {
    if (pixels.length > 0) {
      proceedPixel(pixels.splice(randInt(0, pixels.length - 1), 1)[0]);
      setTimeout(() => {
        proceed();
      }, delay);
    }
  };

  // for each process and starting point, check the surrounding 9 pixels and fill the surrounding pixel
  // if the conditions are satisfied (
  //   within the border;
  // not being itself;
  //  not being filled previously
  //   )
  const proceedPixel = (pixel) => {
    for (let nx = pixel.x - 1; nx < pixel.x + 2; nx++) {
      for (let ny = pixel.y - 1; ny < pixel.y + 2; ny++) {
        if (
          !(
            pixelsIn[nx + "x" + ny] === 1 ||
            ny < 0 ||
            nx < 0 ||
            nx > 256 - 1 ||
            ny > 128 - 1 ||
            (nx === pixel.x && ny === pixel.y)
          )
        ) {
          let color = selectRelevantColor(pixel.color);
          const newPixel = new Pixel(nx, ny, color);
          addPixel(newPixel);
        }
      }
    }
  };

  const selectRelevantColor = (color) => {
    let relevancies = [];
    let relColors = [];
    for (let i = 0; i < randomFactor && i < colors.length; i++) {
      let index = randInt(0, colors.length - 1);
      let c = colors[index];

      let relevancy =
        Math.pow((c.red - color.red) * redFactor, 2) +
        Math.pow((c.blue - color.blue) * blueFactor, 2) +
        Math.pow((c.green - color.green) * greenFactor, 2);
      relevancies.push(relevancy);
      relColors[relevancy + "Color"] = index;
    }
    return colors.splice(relColors[relevancies.min() + "Color"], 1)[0];
  };

  // generate the color pallete
  for (let red = 8; red <= 256; red = red + 8) {
    for (let blue = 8; blue <= 256; blue = blue + 8) {
      for (let green = 8; green <= 256; green = green + 8) {
        colors.push(new Color(red, blue, green));
      }
    }
  }

  // start by generating 5 points to the screen
  for (let i = 0; i < startings; i++) {
    let color = colors.splice(randInt(0, colors.length - 1), 1)[0];
    const pixel = new Pixel(randInt(0, 256 - 1), randInt(0, 128 - 1), color);
    addPixel(pixel);
  }

  for (let i = 0; i < processes; i++) {
    proceed(i);
  }
};

export default draw;
