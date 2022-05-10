radio.onReceivedBuffer(function (rb) {
    response.rtx(rb)
})
serial.onDataReceived("BTRN", function () {
    serial.writeBuffer(response.buf(serial.readBuffer(0)))
})
basic.showIcon(IconNames.Heart)
radio.setGroup(6)
let days = 4
let size = days * 384
I2C.init()
let dlog = datalog.createDatalog(size)
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    if (datalog.fullLog(dlog)) {
        basic.showString("F")
    } else {
        action.log(dlog)
    }
})
