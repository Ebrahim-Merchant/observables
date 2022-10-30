# def findHealthMin(armor, power):
#     sum = 0
#     hasAddedArmor = False
#     max_val = float('-inf')
#     for pow in power:
#         if not hasAddedArmor and (armor == pow or pow > armor):
#             sum += pow - armor
#             hasAddedArmor = True
#         else:
#             sum += pow
#         max_val = max(max_val, pow)

#     if not hasAddedArmor:
#         sum -= max_val

#     return sum + 1


# def minimumHealth(armor, damage):
#     total = sum(damage)
#     maxDamage = max(damage)

#     return total + 1 - min(armor, maxDamage)


# # print(findHealthMin(4, [1, 2, 3]))  # 4
# # print(findHealthMin(1, [1, 2, 3]))  # 6
# # print(findHealthMin(5, [1, 2, 6, 7]))  # 12


# print(minimumHealth(4, [1, 2, 3]))  # 4
# print(minimumHealth(1, [1, 2, 3]))  # 6
# print(minimumHealth(5, [1, 2, 6, 7]))  # 12
# print(minimumHealth(6, [2, 4, 5, 4, 3, 4, 3, 1, 3, 3]))
# print(findHealthMin(6, [2, 4, 5, 4, 3, 4, 3, 1, 3, 3]))

def numSplits(s: str) -> int:
        prefix = {}
        postfix = {}

        prefix[s[0]] = 1

        for i in range(1, len(s)):
            if s[i] in postfix:
                postfix[s[i]] += 1
            else:
                postfix[s[i]] = 1


        print(postfix, prefix)



print(numSplits("abbcac"))
