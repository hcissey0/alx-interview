#!/usr/bin/python3
"""This is the stat file"""

import sys


total_size = 0
status_codes = {
        str(i): 0
        for i in [200, 301, 400, 401, 403, 404, 405, 500]
        }
line_count = 0

def print_stats():
    print("File size: {}".format(total_size))
    for code in sorted(status_codes.keys()):
        print("{}: {}".format(code, status_codes[code]))


try:
    for line in sys.stdin:
        line_count += 1
        try:
            parts = line.split()
            file_size = int(parts[-1])
            total_size += file_size
            code = int(parts[-2])
            status_codes[code] += 1
        except Exception:
            pass
        if line_count % 10 == 0:
            print(f"File size: {total_size}")
            for c in sorted(status_codes):
                print(f"{c}: {status_codes[c]}")

except KeyboardInterrupt:
    print(f"File size: {total_size}")
    for c in sorted(status_codes):
        print(f"{c}: {status_codes[c]}")
