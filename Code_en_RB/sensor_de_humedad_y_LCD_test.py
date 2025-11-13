from grovepi import *
from grove_rgb_lcd import *

dht_sensor_port = 4

while True:
    time.sleep(3)
    try:
        [ temp,hum ] = dht(dht_sensor_port,3)
            
        print("temp =", temp, "C\thumadity =", hum, "%")
        t = str(temp)
        h = str(hum)
            
        #setRGB(0,128,64)
        #setRGB(0,255,0)
        setText("Temp:" + t + "C    "+"Humidity :" + h + "%")
    except (IOError, TypeError) as e:
        print("Error")