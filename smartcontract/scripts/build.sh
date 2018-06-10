WP_DIR=..
SC_NAME=pen

cleos wallet unlock --password PW5JacAgsfriUH3yE15udPAogWZpbmUPamBi1hasFDNekeAMXXqpB

echo Building ABI...
eosiocpp -g $WP_DIR/$SC_NAME.abi $WP_DIR/$SC_NAME.hpp

echo Building WASM...
eosiocpp -o $WP_DIR/$SC_NAME.wast $WP_DIR/$SC_NAME.cpp
