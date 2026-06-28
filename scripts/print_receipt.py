#!/usr/bin/env python3
"""Sends raw ESC/POS binary (from stdin) to CPP-3000 via USB."""
import sys
import usb.core
import usb.util

VID = 0x1fc9
PID = 0x2016

def send(data: bytes) -> None:
    dev = usb.core.find(idVendor=VID, idProduct=PID)
    if dev is None:
        raise RuntimeError('Printer not found (VID=0x1fc9 PID=0x2016)')

    try:
        if dev.is_kernel_driver_active(0):
            dev.detach_kernel_driver(0)
    except (NotImplementedError, usb.core.USBError):
        pass

    dev.set_configuration()

    cfg  = dev.get_active_configuration()
    intf = cfg[(0, 0)]
    ep   = usb.util.find_descriptor(
        intf,
        custom_match=lambda e:
            usb.util.endpoint_direction(e.bEndpointAddress) == usb.util.ENDPOINT_OUT
    )
    if ep is None:
        raise RuntimeError('Bulk OUT endpoint not found')

    chunk = 4096
    for i in range(0, len(data), chunk):
        ep.write(data[i:i + chunk])

if __name__ == '__main__':
    data = sys.stdin.buffer.read()
    send(data)
