/**
* Log access
*/
class Datalog {
    buffer: Buffer;
    end: number;
    constructor(size: number) {
        this.buffer = pins.createBuffer(size);
        this.end = 0;
    }
    add(datum: Buffer): void {
        this.buffer.write(this.end, datum);
        this.end += datum.length;
    }
    read(offset: number, length: number) {
        return this.buffer.slice(offset, length)
    }
}
/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="✎"
namespace datalog {
    /**
 * Create datalog
 */
    //% block
    export function createDatalog(size: number): Datalog {
        return new Datalog(size)
    }
    /**
* Add datum to log buffer
*/
    //% block
    export function addLog(dlog: Datalog, datum: Buffer): void {
        dlog.add(datum)
    }
    /**
    * Read slice from log buffer
    */
    //% block
    export function readLog(dlog: Datalog, offset: number, length: number): Buffer {
        return dlog.read(offset, length)
    }
    /**
* Dump log buffer
*/
    //% block
    export function dumpLog(dlog: Datalog): Buffer {
        return dlog.buffer
    }
    /**
* End log buffer
*/
    //% block
    export function endLog(dlog: Datalog): number {
        return dlog.end
    }
    /**
* Full log buffer test
*/
    //% block
    export function fullLog(dlog: Datalog): boolean {
        return dlog.end >= dlog.buffer.length
    }
}