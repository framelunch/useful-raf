type Animation = () => void;

export interface IO {
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

class RequestAnimationFrameFps implements IO {
  id: number | null = null;
  animation: Animation;
  options: Options;

  constructor(animation: Animation, options: Options) {
    this.options = options;
    this.animation = this.getAnimation(animation);
  }

  getAnimation(animation: Animation): Animation {
    const startTime = performance.now();
    let lastFrame = 0;

    return () => {
      const timeDiff = performance.now() - startTime;
      const frame = Math.ceil(timeDiff / (1000 / this.options.fps));

      if (lastFrame < frame) {
        animation();
        lastFrame = frame;
      }
      this.id = requestAnimationFrame(this.animation);
    };
  }

  start() {
    if (this.id) {
      throw new Error(`Animation still running! ID[${this.id}]`);
    }

    this.id = requestAnimationFrame(this.animation);
  }

  stop() {
    if (!this.id) {
      throw new Error(`Animation not running! ID[${this.id}]`);
    }

    cancelAnimationFrame(this.id);
    this.id = null;
  }
}

export function create(animation: Animation, options: OptionProps = defaultOptions): IO {
  return new RequestAnimationFrameFps(animation, { ...defaultOptions, ...options });
}
