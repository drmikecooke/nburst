serial.onDataReceived("HBTRN", function () {
    rbuf = serial.readBuffer(0)
    c = String.fromCharCode(rbuf.getUint8(0))
    if (c == "B") {
        let offset = rbuf.getNumber(NumberFormat.UInt16LE,1)
let length=rbuf.getUint8(3)
serial.writeBuffer(datalog.readLog(dlog, offset, length))
    }
})
let c = ""
let rbuf: Buffer = null
let dlog: Datalog = null
let offset2 = 0
basic.showIcon(IconNames.Heart)
let days = 1
let hourLength = 10000
let size = days * 24 * 16
I2C.init()
dlog = datalog.createDatalog(size)
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    if (datalog.fullLog(dlog)) {
        basic.showString("F")
    } else {
        datalog.addLog(dlog, I2C.read(Device.BME))
        basic.pause(200)
        datalog.addLog(dlog, I2C.read(Device.TCS))
        basic.pause(200)
    }
})
