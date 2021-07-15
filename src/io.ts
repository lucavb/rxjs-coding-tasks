import { createInterface } from 'readline';
import { bindCallback, Observable, tap } from 'rxjs';

export const askQuestion = (question: string): Observable<string> => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const boundQuestion = bindCallback(rl.question.bind(rl));
    return boundQuestion(`${question}\n`, {}).pipe(tap(() => rl.close()));
};
