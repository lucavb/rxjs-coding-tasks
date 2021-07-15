// now we only care about commits whose hash
// starts with a number

// hint: try the getCommitStream function, the first parameter tells you at what rate the commits will come at most!
// also strings can be accessed just like arrays ;)

import { getCommitStream } from './http';

getCommitStream(100);
