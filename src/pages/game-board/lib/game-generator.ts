type Color = number; // 0: empty, 1~n: colors
type Bottle = Color[];
type GameState = Bottle[];

interface Move {
    from: number;
    to: number;
    amount: number;
}

const BOTTLE_HEIGHT = 4;
const EMPTY_BOTTLES = 2;

/**
 * 새로운 Water Sort 퍼즐을 생성합니다
 * @param colorCount 색상의 개수
 * @param emptyBottles 빈 병의 개수 (기본값: 2)
 * @param shuffleMoves 섞기 이동 횟수 (기본값: 50)
 */
function generatePuzzle(colorCount: number, emptyBottles: number = 2, shuffleMoves: number = 50): GameState {
    // 1. 완성된 상태로 시작
    const gameState = createSolvedState(colorCount, emptyBottles);

    // 2. 유효한 역방향 이동으로 섞기
    shuffleGame(gameState, shuffleMoves);

    return gameState;
}

/**
 * 완성된 상태(각 병이 단색으로 가득참)를 생성
 */
function createSolvedState(colorCount: number, emptyBottles: number): GameState {
    const bottles: GameState = [];

    // 각 색상별로 하나의 병을 만들어 가득 채움
    for (let color = 1; color <= colorCount; color++) {
        const bottle: Bottle = new Array(BOTTLE_HEIGHT).fill(color);
        bottles.push(bottle);
    }

    // 빈 병들 추가
    for (let i = 0; i < emptyBottles; i++) {
        bottles.push([]);
    }

    return bottles;
}

/**
 * 게임 상태를 섞습니다 (역방향 이동 적용)
 */
function shuffleGame(gameState: GameState, moves: number): void {
    for (let i = 0; i < moves; i++) {
        const possibleMoves = getAllValidMoves(gameState);

        if (possibleMoves.length === 0) {
            break; // 더 이상 유효한 이동이 없으면 중단
        }

        // 랜덤하게 하나의 이동 선택
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        executeMove(gameState, randomMove);
    }
}

/**
 * 현재 상태에서 가능한 모든 유효한 이동을 찾습니다
 */
function getAllValidMoves(gameState: GameState): Move[] {
    const moves: Move[] = [];

    for (let from = 0; from < gameState.length; from++) {
        for (let to = 0; to < gameState.length; to++) {
            if (from === to) continue;

            const move = getValidMove(gameState, from, to);
            if (move) {
                moves.push(move);
            }
        }
    }

    return moves;
}

/**
 * 두 병 사이의 유효한 이동을 확인하고 반환합니다
 */
function getValidMove(gameState: GameState, from: number, to: number): Move | null {
    const fromBottle = gameState[from];
    const toBottle = gameState[to];

    // 출발 병이 비어있으면 이동 불가
    if (fromBottle.length === 0) return null;

    // 목적지 병이 가득 차있으면 이동 불가
    if (toBottle.length >= BOTTLE_HEIGHT) return null;

    const topColorFrom = fromBottle[fromBottle.length - 1];

    // 목적지 병이 비어있거나, 같은 색상이면 이동 가능
    if (toBottle.length === 0 || toBottle[toBottle.length - 1] === topColorFrom) {
        // 연속된 같은 색상의 개수 계산
        const amount = getConsecutiveCount(fromBottle, topColorFrom);

        // 목적지 병의 남은 공간 계산
        const availableSpace = BOTTLE_HEIGHT - toBottle.length;

        // 실제 이동할 수 있는 양
        const moveAmount = Math.min(amount, availableSpace);

        if (moveAmount > 0) {
            return { from, to, amount: moveAmount };
        }
    }

    return null;
}

/**
 * 병의 맨 위에서부터 연속된 같은 색상의 개수를 계산
 */
function getConsecutiveCount(bottle: Bottle, color: Color): number {
    let count = 0;
    for (let i = bottle.length - 1; i >= 0; i--) {
        if (bottle[i] === color) {
            count++;
        } else {
            break;
        }
    }
    return count;
}

/**
 * 이동을 실행합니다
 */
function executeMove(gameState: GameState, move: Move): void {
    const { from, to, amount } = move;
    const fromBottle = gameState[from];
    const toBottle = gameState[to];

    // from 병에서 액체 제거
    const movedLiquid = fromBottle.splice(-amount, amount);

    // to 병에 액체 추가
    toBottle.push(...movedLiquid);
}

/**
 * 게임 상태를 콘솔에 출력 (디버깅용)
 */
function printGameState(gameState: GameState): void {
    console.log("=== Game State ===");
    gameState.forEach((bottle, index) => {
        const display = bottle.length === 0 ? "[]" : `[${bottle.join(",")}]`;
        console.log(`Bottle ${index}: ${display}`);
    });
    console.log("==================");
}

/**
 * 퍼즐이 해결되었는지 확인
 */
function isSolved(gameState: GameState): boolean {
    return gameState.every(bottle => {
        // 빈 병이거나
        if (bottle.length === 0) return true;

        // 가득 차있고 모든 색상이 같은 경우
        if (bottle.length === BOTTLE_HEIGHT) {
            const firstColor = bottle[0];
            return bottle.every(color => color === firstColor);
        }

        return false;
    });
}


export {
    generatePuzzle,
    printGameState,
    isSolved,
    executeMove,
    getAllValidMoves,
    type GameState,
    type Move
};