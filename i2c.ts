/**
* I2C initializations and buffer reads
*/

enum Device {
    //% block="tcs"
    TCS = 41,
    //% block="bme"
    BME = 118
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="⇄"
namespace I2C {

    let buffer = pins.createBuffer(8)
    function writeByte(addr: number, register: number, value: number):void {
        buffer[0] = register
        buffer[1] = value
        pins.i2cWriteBuffer(addr, buffer.slice(0,2), false);
    }
    function dataregister(d: Device): number {
        switch (d) {
            case Device.BME: return 247;
            case Device.TCS: return 180
        }
    }
    /**
     * 
     * Initialize I2C devices
     */
    //% block
    export function init():void {
        // Soft reset
        writeByte(Device.BME, 224, 182)
        basic.pause(200)
        // x16 humidity oversampling
        writeByte(Device.BME, 242, 7)
        basic.pause(200)
        // x16 oversampling, normal mode
        writeByte(Device.BME, 244, 183)
        basic.pause(200)
        // 500ms standby time, 16 filter coef
        writeByte(Device.BME, 245, 144)
        basic.pause(200)
        writeByte(Device.TCS, 128, 3)
        basic.pause(200)
        writeByte(Device.TCS, 129, 43)
        basic.pause(200)
    }
    /**
     * Read I2C device into buffer
     */
    //% block
    export function read(d: Device): Buffer {
        pins.i2cWriteNumber(
            d,
            dataregister(d),
            NumberFormat.UInt8LE,
            false
        )
        basic.pause(200)
        buffer.write(0, pins.i2cReadBuffer(d, 8, false))
        return buffer
    }
}
