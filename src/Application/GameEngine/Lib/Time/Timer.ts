import Engine from "@gameengine/Core/Engine";
import Time from "@gameengine/Lib/Time/Time";

type _ExecutionItem = { delay: number, repeat: Boolean, callback: Function; lastCall: number; };

class Timer {

    #startTime: number;
    #time: number;

    executionStack: _ExecutionItem[] = [];

    constructor() {
        Engine.addUpdatable(this);
        this.#startTime = performance.now();
        this.#time = this.#startTime;
    }

    get delta() {
        return Time.delta(this.#startTime, this.#time);
    }

    executeAfter(callback: Function, delay: number) {
        this.executionStack.push({
            delay,
            repeat: false,
            callback,
            lastCall: this.#time
        });
    }

    executeEach(delay: number, callback: Function) {
        this.executionStack.push({
            delay,
            repeat: true,
            callback,
            lastCall: this.#time
        });
    }

    watchCallbacks() {
        let itemsToDelete: number[] = [];
        this.executionStack.forEach((item: _ExecutionItem, index: number) => {
            if (!item.repeat) {
                if (this.delta >= item.delay) {
                    item.callback();
                }
                itemsToDelete.push(index);
            } else {
                if (Time.delta(this.#time, item.lastCall) >= item.delay) {
                    item.callback();
                    item.lastCall = this.#time;
                }
            }
        });

        itemsToDelete.forEach((_, index: number) => this.executionStack.splice(index, 1));
    }

    update() {
        this.#time = performance.now();
        this.watchCallbacks();
    }

}

export default Timer;