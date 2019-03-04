import { isFree } from './isFree';
import { log } from './log';
import { BTData } from '../types/BTData';
import { MoveDirection } from '../types/MoveDirection';
import { shuffle } from './shuffle';
import { weight } from './weight';

export function smartRandomMove(data: BTData) {
    let direction, x, y;
    const directions = [MoveDirection.LEFT, MoveDirection.RIGHT, MoveDirection.UP, MoveDirection.DOWN];
    shuffle(directions);
    while (direction = directions.pop()) {
        switch (direction) {
            case MoveDirection.UP:
                x = data.you.body[0].x;
                y = data.you.body[0].y - 1;
                break;

            case MoveDirection.DOWN:
                x = data.you.body[0].x;
                y = data.you.body[0].y + 1;
                break;

            case MoveDirection.LEFT:
                x = data.you.body[0].x - 1;
                y = data.you.body[0].y;
                break;

            case MoveDirection.RIGHT:
                x = data.you.body[0].x + 1;
                y = data.you.body[0].y;
                break;
        }

        if (isFree(data, x, y)) {
            const w = weight(data, x, y);
            if (w < 40) {
                continue;
            }
            log('smartRandomMove', direction);
            return direction;
        }
    }
    log('smartRandomMove', 'no-options');
}
