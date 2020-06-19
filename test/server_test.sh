#/bin/bash

cd "$(dirname $0)"

SERVER_URL=http://localhost:3000/control

echo "28C Auto On"
curl -X POST -H "Content-Type:application/json" -d '{"switch":"on", "mode": "cool"}' "$SERVER_URL"
echo ""
sleep 10

echo "22H Auto On"
curl -X POST -H "Content-Type:application/json" -d '{"switch":"on", "mode": "heat"}' "$SERVER_URL"
echo ""
sleep 10

echo "Off"
curl -X POST -H "Content-Type:application/json" -d '{"switch":"off"}' "$SERVER_URL"
echo ""
