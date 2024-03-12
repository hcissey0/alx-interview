#!/usr/bin/python3
"""This is the prime game project"""

def isWinner(x, nums):
    """This is to determine who wins

    Args:
        x (_type_): _description_
        nums (_type_): _description_
    """
    players = {
        'Maria': 0,
        'Ben': 0
    }
    for i in range(x):
        n = nums[i]
        arr = [True for _ in range(n + 1)]
        p = 2
        while p * p <= n:
            if arr[p]:
                for j in range(p * p, n + 1, p):
                    arr[j] = False
            p += 1
        primes = []
        for j in range(2, n + 1):
            if arr[j]:
                primes.append(j)
        if len(primes) % 2 == 0:
            players['Ben'] += 1
        else:
            players['Maria'] += 1

    if players['Ben'] > players['Maria']:
        return 'Ben'
    else:
        return 'Maria'
