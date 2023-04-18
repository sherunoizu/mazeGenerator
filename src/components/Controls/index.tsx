import { useMaze } from "../MazeContext";
import styles from "./Controls.module.scss";

const MAX_SIZE = 20;

function Controls() {
  const { generateMaze } = useMaze();

  return (<div className={styles.container}>
    <div className={styles.sizeSelector}>
      <label htmlFor="maze-size">Size</label>
      <select id="maze-size" defaultValue="10" disabled className={styles.dropdown}>
        {[...Array(MAX_SIZE).keys()].map((size) => {
          return <option key={size} value={size + 1}>{size + 1}</option>
        })}
      </select>
    </div>

    <button onClick={generateMaze} className={styles.button}>Generate</button>
  </div>);
}

export default Controls;