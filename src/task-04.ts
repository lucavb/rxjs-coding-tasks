// get some input from the shell
// and then fetch some information on the origin of the breed

// popular breeds include Bengal, Burmese or Chausie

import { findOriginByBreedName } from './http';
import { askQuestion } from './io';

askQuestion('Some Question?');
findOriginByBreedName('Some Breed');
