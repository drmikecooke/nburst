/**
* Response to command sequences
*/

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="℟"
namespace response {
    let buffer = pins.createBuffer(19)
    let end = 0
    function set32(num: number) {
        buffer.setNumber(NumberFormat.UInt32LE, 0, num)
        end = 4
    }
    /**
    * Parse request
    */
    //% block
    export function buf(rbuf: Buffer): Buffer {
        let c = String.fromCharCode(rbuf.getUint8(0))
        switch (c) {
            case "T":
                set32(input.runningTime() / 1000)
                return buffer.slice(0, 4);
            case "R":
                control.reset()
                return buffer.slice(0, 4);
            case "N":
                set32(dlog.end)
                return buffer.slice(0, 4);
            case "B":
                let readOffset = rbuf.getNumber(NumberFormat.UInt16LE, 1)
                let readLength = rbuf.getUint8(3)
                return dlog.buffer.slice(readOffset, readLength);
            default:
                set32(0)
                return buffer.slice(0, 4);
        }
    }
    /**
    * Radio response
    */
    //% block
    export function rtx(rbuf: Buffer): void{
        radio.sendBuffer(buf(rbuf))
    }
}