import { BTData } from '../../types/BTData';
import { Color } from '../../types/Color';
import { HeadType } from '../../types/HeadType';
import { TailType } from '../../types/TailType';
import { moveTowardsFoodPf } from '../../lib/moveTowardsFoodPf';
import { moveTowardsEnemy } from '../../lib/moveTowardsEnemy';
import { randomMove } from '../../lib/randomMove';
import { moveAway } from '../../lib/moveAway';
import { smartRandomMove } from '../../lib/smartRandomMove';
import { BaseSnake } from './base-snake';
import { ISnake } from './snake-interface';

export class KeepAway extends BaseSnake implements ISnake {
    public port: number = 9002;

    public color = Color.YELLOW;
    public headType = HeadType.DEAD;
    public tailType = TailType.CURLED;

    move(data: BTData) {
        let direction;
        if (data.you.health < 10) {
            direction = moveTowardsFoodPf(data);
        }
        if (!direction) {
            direction = moveAway(data);
        }
        if (!direction) {
            direction = smartRandomMove(data);
        }
        if (!direction) {
            direction = randomMove(data);
        }
        return {
            move: direction,
        };
    }
}
