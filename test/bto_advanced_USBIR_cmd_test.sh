#/bin/bash

cd "$(dirname $0)"

echo "28C Auto On"
bto_advanced_USBIR_cmd -d $(cat ../signals/28C_Auto_On.txt)
sleep 10

echo "22H Auto On"
bto_advanced_USBIR_cmd -d $(cat ../signals/22H_Auto_On.txt)
sleep 10

echo "Off"
bto_advanced_USBIR_cmd -d $(cat ../signals/Off.txt)