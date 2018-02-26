# A python basefile to model the Inclined plane
import math
import numpy as np
import matplotlib.pyplot as plt

# Object for the moving mass object along the Inclined plane

class objekt(object):
	"""docstring for objekt
	an mass object that move along the inlcined plane (another class object)
	Input:
		Mass [kg]
		mi [-] - friction coefficient
		dzetta [] - electromagnetic drag force coefficient
	"""
	def __init__(self, mass, mi, dzetta, v=0, pos=0):
		self.m = mass
		self.mi = mi
		self.dzetta = dzetta
		self.v = v
		self.a = 0
		self.F = 0
		self.pos = 0
		self.g = 9.81

	def update(self, rownia, dt=1):
		"""
		This method makes the update in each time loop
		rownia.getForces(self, force)
		"""
		Fa, Fn = rownia.getForces(self.m * self.g)
		
		self.a = ((Fa - self.mi * Fn - self.dzetta * self.v) / self.m)

		self.v += self.a * dt

		self.pos += self.v * dt

class rownia:
	"""docstring for rownia
	angle [deg] - angle of the plane in degrees
	length [m] - length of the plane (the travel distance)"""
	def __init__(self, angle=45, length=1):
		self.angle = angle
		self.length = length
		self.g = 9.81 # earth grav accel [m/s2]

		self.setup()

	def __repr__(self):
		return "This is a Inclined Plane class object"

	def __str__(self):
		return "Równia pochyła, kąt: {}deg, długość: {}m".format(self.angle, self.length)

	def setAngle(self, angle):
		"""
		method to set new angle after creation
		inputs:
			angle [deg]
		"""
		self.angle = angle
		self.setup()

	def setup(self):
		"""
		Setup procedure that calculate the internal values
		base - the base length of the system
		height - the height of the system 
		"""
		self.angle_rad = math.radians(self.angle)
		self.base = self.length * math.cos(self.angle_rad)
		self.height = self.length * math.sin(self.angle_rad)

	def getForces(self, force):
		"""
		Returns components of the given force in both directions
		parralel and perpendicular to the plane
		"""
		return force * math.sin(self.angle_rad), force * math.cos(self.angle_rad) 

	def frictionCoeff(self, mass, time):
		"""
		REturns the calculated friction coefficient for the body of mass 
		that move along the lenght in time
		"""
		return (math.sin(self.angle_rad) - (2*self.length / (self.g * time**2))) / math.cos(self.angle_rad)

	def getDzetta(self, mi, mass, time):
		"""
		return the dzetta coeficient that describe the magnetic drag force 
		relation with velocity: Fm = dzetta * Velocity
      this solution now assumes the V-const
		for given:
			time [s] - travel time
			mass [kg] - object/magness mass
			mi [-] - mechanical friction coefficient
		"""
		return  ((mass *self.g * time) / (self.length)) * (math.sin(self.angle_rad) - mi * math.cos(self.angle_rad)) - (mass/time)


R = rownia(angle=45, length=0.5)

O = objekt(mass=0.057, mi=R.frictionCoeff(0.057,13/25.0), dzetta=R.getDzetta(R.frictionCoeff(0.057,13/25.0),0.057,11+10/25.0))



print(R)
print('wsp. Tarcia 57g, 0.5s: ', R.frictionCoeff(0.057,13/25.0))
print('wsp. Dzetta: 57g, 11s mi jak wyżej: ',R.getDzetta(R.frictionCoeff(0.057,13/25.0),0.057,11+10/25.0))

v=[]
x=[]

dt = 0.01
time = np.arange(0,13,dt)
for t in time:
	O.update(R, dt)
	v.append(O.v)
	x.append(O.pos)

plt.plot(time, v, label='velocity')
plt.plot(time, x, label='position')
plt.legend()
plt.xlabel('time [s]')
plt.show()




# angle = np.arange(1,89,2)
# mi = []
# dz = []

# for a in angle:
# 	R.setAngle(a)
# 	mi.append(R.frictionCoeff(0.05,1))
# 	dz.append(R.getDzetta(mi[-1], 0.05,4))

# 	print(a, mi[-1], dz[-1])

# plt.plot(angle,mi, label="Wsp. tarcia")
# plt.plot(angle,dz, label="Wsp. dzetta")
# plt.xlabel('Kąt [deg]')
# plt.legend()
# plt.grid()
# plt.show()