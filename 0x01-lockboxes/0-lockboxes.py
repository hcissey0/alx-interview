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

    # i = 0
    # total = list(set(boxes[0]) | {0})
    # while i < len(total):
    #     newkeys = boxes[total[i]]
    #     total += [key for key in newkeys if key not in total]
    #     i += 1
    # return len(total) == len(boxes)
    
    # keys = [0]
    # for i, box in enumerate(boxes):
    #     if i != 0 and i in box and keys.count(i) == 0:
    #         return False
    #     keys.extend(box)
    # return True

    total_boxes = len(boxes)
    unlocked = [False] * total_boxes
    unlocked[0] = True
    keys = [key for key in boxes [0] if key < total_boxes]
    while keys:
        new_keys = []
        for key in keys:
            if not unlocked[key]:
                unlocked[key] = True
                new_keys += [new_key for new_key in boxes[key] if new_key < total_boxes]
        keys = new_keys
    return all(unlocked)
