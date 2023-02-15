# Love Particles

## Given Instructions
As an assignment for CART 263, I was given the phrase "deeply in love" and tasked with creating a particle system that reflects it.

## Behaviour, as it exists currently
The particles start out by simply wandering around. Their wandering path is determined by using a noise function to determine a semi-random direction to head in. This is recorded in a vector, which is then added to a vector representing the each particle's current position. This occurs as long as particles remain far away from each other.

When particles get close enough to each other, a new vector is calculated, this is the path from each particle's current position to its nearest neighbour. This is added, along with the wandering vector, to the particle's position vector. THe magnitude of both vectors being added is determined by the distance from the nearest particle. The closer, the heavier the path to the particle is weighted, the further, the heavier the wandering vector is weighted. To prevent the particles from simply joining together, the path to the nearest particle stops being applied when they get too close.

For the aesthetic elements, a blur is applied to the particles, which decreases as the particles get closer. Similarly, they start out a purple colour when far from each other, but this is gradually interpolated to a much lighter and redder colour when they get closer to each other.

## Behaviour I would have wished for.
I ultimately would have liked to define an orbit for the particles to enter, as currently the particles get very jittery when close to each other from switching between the wandering vector and the path-to-one-another vector. They also don't really orbit, as much as they wander together for a bit. However, I also wanted to maintain their current spontanaeity, which I didn't know how to do with a defined orbit for them to follow.

I also wanted to implement a behaviour wherein the particles had a more fluid shape that shifted semi-randomly. When close enough to each other for a long time, this shape would shift until the two particles merged. I would have implemented this by using the cutom shapes along with some curves, and changing the points on the curve to move towards each other once orbiting. I hoped that this would strike a balance between cute and a bit unsettling in a gross fluid-y way.

Finally, I also wanted to implement more variation in the colours. My ideas here were less defined, but I wanted to have semi-random colour-varying parts on the particles and the background, to hopefully give them a slightly more painterly look. The colour palette was also initially thought of as deriving from the colours of flesh, and I hoped the ability to add colours would emphasize this.