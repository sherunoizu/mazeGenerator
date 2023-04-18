import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type MazeCell = {
  isStart: boolean;
  isEnd: boolean;
  walls: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
};

type DirectionType = "left" | "right" | "top" | "bottom";

interface MazeContextData {
  maze: MazeCell[][];
  generateMaze: () => void;
}

const MazeContext = createContext<MazeContextData | undefined>(undefined);

export const MazeProvider = ({ children }: PropsWithChildren) => {
  const [maze, setMaze] = useState<MazeCell[][]>([]);

  const randomSide = (): DirectionType => {
    const key = Math.floor(Math.random() * 4);

    switch (key) {
      case 0:
        return "left";
      case 1:
        return "right";
      case 2:
        return "top";
      case 3:
        return "bottom";
      default:
        return "left";
    }
  };

  const generateCorrectWay = (
    maze: MazeCell[][],
    coordinates: [number, number]
  ): void => {
    let [i, j] = coordinates;

    const generationDepth: number = maze.length + maze[0].length;

    let falseValuesCounter = new Set("");

    for (let x = 0; x < generationDepth; x++) {
      const direction = randomSide();

      const isRemoved = removeWalls(maze, [i, j], direction);

      if (isRemoved) {
        falseValuesCounter.clear();

        i = isRemoved[0];
        j = isRemoved[1];
      }

      if (isRemoved === false) {
        falseValuesCounter.add(direction);
      }

      const isBreakingCondition =
        falseValuesCounter.size === 4 || (i === 9 && j === 9);

      if (isBreakingCondition) break;
    }
  };

  const generateMaze = () => {
    const newMaze: MazeCell[][] = [];

    for (let x = 0; x < 10; x++) {
      const column: MazeCell[] = [];

      for (let y = 0; y < 10; y++) {
        const cell: MazeCell = {
          isStart: x === 0 && y === 0 ? true : false,
          isEnd: x === 9 && y === 9 ? true : false,
          walls: {
            top: true,
            right: true,
            bottom: true,
            left: true,
          },
        };

        column.push(cell);
      }

      newMaze.push(column);
    }

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        generateCorrectWay(newMaze, [i, j]);
      }
    }

    setMaze(newMaze);
  };

  const hasEmptyWalls = (mazeCell: MazeCell): boolean => {
    return Object.values(mazeCell.walls).filter((item) => item).length < 4;
  };

  const removeWalls = (
    maze: MazeCell[][],
    coordinates: [number, number],
    direction: DirectionType
  ): false | number[] => {
    const [i, j] = coordinates;

    const isTopDirectionClosed =
      direction === "top" && (j === 0 || hasEmptyWalls(maze[i][j - 1]));

    const isBottomDirectionClosed =
      direction === "bottom" &&
      (j === maze.length - 1 || hasEmptyWalls(maze[i][j + 1]));

    const isLeftDirectionClosed =
      direction === "left" && (i === 0 || hasEmptyWalls(maze[i - 1][j]));

    const isRightDirectionClosed =
      direction === "right" &&
      (i === maze.length - 1 || hasEmptyWalls(maze[i + 1][j]));

    if (
      isRightDirectionClosed ||
      isLeftDirectionClosed ||
      isTopDirectionClosed ||
      isBottomDirectionClosed
    ) {
      return false;
    }

    maze[i][j].walls[direction] = false;

    switch (direction) {
      case "right":
        if (maze[i + 1][j]) {
          maze[i + 1][j].walls.left = false;
        }
        return [i + 1, j];
      case "left":
        if (maze[i - 1][j]) {
          maze[i - 1][j].walls.right = false;
        }
        return [i - 1, j];
      case "top":
        if (maze[i][j - 1]) {
          maze[i][j - 1].walls.bottom = false;
        }
        return [i, j - 1];
      case "bottom":
        if (maze[i][j + 1]) {
          maze[i][j + 1].walls.top = false;
        }
        return [i, j + 1];
    }
  };

  useEffect(() => {
    generateMaze();
  }, []);

  return (
    <MazeContext.Provider value={{ maze, generateMaze }}>
      {children}
    </MazeContext.Provider>
  );
};

export const useMaze = () => {
  const context = useContext(MazeContext);
  if (!context) {
    throw new Error("useMaze must be used within a MazeProvider");
  }
  return context;
};
