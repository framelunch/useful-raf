type Animation = () => void;

export interface IO {
  readonly currentFps: number;
  isRunning(): boolean;
  start(): void;
  stop(): void;
}

export interface Options {
  fps: number;
}

export interface OptionProps {
  fps?: number;
}

const defaultOptions: Options = {
  fps: 60,
};

/*
 * set polyfill
 */

if (!window.requestAnimationFrame) {
  let lastAnimatedTime = 0;

  window.requestAnimationFrame =
    window.webkitRequestAnimationFrame ||
    (window as any).mozRequestAnimationFrame ||
    (window as any).msRequestAnimationFrame ||
    (window as any).oRequestAnimationFrame ||
    ((callback: FrameRequestCallback): number => {
      const currentTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currentTime - lastAnimatedTime));
      const id = setTimeout(() => callback(currentTime + timeToCall), timeToCall);
      lastAnimatedTime = currentTime + timeToCall;
      return (id as any) as number;
    });
}

if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame =
    window.webkitCancelAnimationFrame ||
    (window as any).webkitCancelRequestAnimationFrame ||
    (window as any).mozCancelAnimationFrame ||
    (window as any).mozCancelRequestAnimationFrame ||
    (window as any).msCancelAnimationFrame ||
    (window as any).msCancelRequestAnimationFrame ||
    (window as any).oCancelAnimationFrame ||
    (window as any).oCancelRequestAnimationFrame ||
    ((id: number) => clearTimeout(id));
}

class RequestAnimationFrameFps implements IO {
  id: number | null = null;
  currentFps = 0;
  animation: Animation;
  options: Options;

  constructor(animation: Animation, options: Options) {
    this.options = options;
    this.animation = this.getAnimation(animation);
  }

  getAnimation(animation: Animation): Animation {
    const frameMillisecond = 1000 / this.options.fps;
    let lastAnimatedTime = performance.now();

    return () => {
      const currentTime = performance.now();
      const timeDiff = currentTime - lastAnimatedTime;

      if (this.options.fps === defaultOptions.fps || timeDiff >= frameMillisecond) {
        animation();
        lastAnimatedTime = currentTime;
        this.currentFps = 1000 / timeDiff;
      }
      this.id = requestAnimationFrame(this.animation);
    };
  }

  isRunning(): boolean {
    return this.id != null;
  }

  start() {
    if (this.isRunning()) {
      throw new Error(`Animation is still running! ID[${this.id}]`);
    }

    this.id = requestAnimationFrame(this.animation);
  }

  stop() {
    if (!this.id) {
      throw new Error('Animation is not running!');
    }

    cancelAnimationFrame(this.id);
    this.id = null;
  }
}

export function create(animation: Animation, options: OptionProps = defaultOptions): IO {
  return new RequestAnimationFrameFps(animation, { ...defaultOptions, ...options });
}
