basic.showIcon(IconNames.Heart)
I2C.init()
serial.writeBuffer(I2C.read(Device.BME))
basic.pause(1000)
serial.writeBuffer(I2C.read(Device.TCS))
basic.pause(1000)
basic.forever(function () {
	
})
