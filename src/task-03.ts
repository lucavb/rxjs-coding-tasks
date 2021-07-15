// now try the getCommitUnstable function
// will "randomly" crash and you should deal with this error

import { getCommitUnstable } from './http';

getCommitUnstable(500, 10);
