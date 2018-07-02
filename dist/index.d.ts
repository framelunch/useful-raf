declare type Animation = () => void;
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
export declare function create(animation: Animation, options?: OptionProps): IO;
export {};
