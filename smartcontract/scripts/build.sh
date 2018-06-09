WP_DIR=..

echo Building ABI...
eosiocpp -g $WP_DIR/donation.abi $WP_DIR/donation.hpp

echo Building WASM...
eosiocpp -o $WP_DIR/donation.wast $WP_DIR/donation.cpp
