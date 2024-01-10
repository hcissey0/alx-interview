#!/usr/bin/python3
"""This is the locked boxes problem"""


def canUnlockAll(boxes):
    """This function determines if all boxes can be unlocked"""

    keys = [0, ] + [ j for i in boxes for j in i]
    for i, v in enumerate(boxes):
        if i in keys:
            pass
        else:
            return False
        if i != 0:
            if i in v and keys.count(i) == 1:
                return False

    return True
