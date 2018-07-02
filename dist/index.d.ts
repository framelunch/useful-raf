declare type Animation = () => void;
export interface IO {
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
