import math
def f(x,y):
    return 2*x-5*y

def d(x,y):
    return 12*y**3-5*x

print(f(-1,2))
print(d(-1,2))
print(math.sqrt((f(-1,2)**2)+(d(-1,2)**2)))
print(math.sqrt(0))


def imc(masa,estatura):
    return masa/(estatura**2)

m = 158
print(imc(75,175))