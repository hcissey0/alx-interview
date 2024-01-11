#!/usr/bin/python3
"""This is the locked boxes problem"""


def canUnlockAll(boxes):
    """This function determines if all boxes can be unlocked"""

    # if boxes is None:
    #     return False
    # if type(boxes) != list:
    #     return False
    # for i in boxes:
    #     if type(i) != list:
    #         return False
    # keys = [0,] + [j for i in boxes for j in i]
    # for i, v in enumerate(boxes):
    #     if i not in keys:
    #         return False
    #     if i != 0:
    #         if i in v and keys.count(i) == 1:
    #             return False

    # return True

    keys = [0] + [key for box in boxes for key in box]
    for i, box in enumerate(boxes):
        if i not in keys or \
        i != 0 and i in box and keys.count(i) == 1:
            return False
    return True
