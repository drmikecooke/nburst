/**
* Hourly action
*/

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="⌛"
namespace action {
    function hourTime() {
        return input.runningTime() / hourLength
    }
    let hour = 0
    let sec =1000
    let hourLength=60*60*sec
    /**
* Logging every hour
*/
    //% block
    export function log(dlog: Datalog): void {
        if (hour < hourTime()) {
            datalog.addLog(dlog, I2C.read(Device.BME))
            datalog.addLog(dlog, I2C.read(Device.TCS))
            hour += 1
            basic.showNumber(hour % 10)
        }
    }
}