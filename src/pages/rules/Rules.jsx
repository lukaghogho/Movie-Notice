import styles from "./Rules.module.css";

const Rules = () => {
  return (
    <div className={styles.box}>
      <div className={styles.section}>
        <h2 className={styles.heading}>Rules & Terms of Service</h2>
        <ul className={styles.list}>
          <li className={styles.rule}>• You do not talk about Fight Club.</li>
          <li className={styles.rule}>• You DO NOT talk about Fight Club.</li>
          <li className={styles.rule}>
            {" "}
            • If someone says "stop" or goes limp, taps out the fight is over.
          </li>
          <li className={styles.rule}>• Only two guys to a fight.</li>
          <li className={styles.rule}>• One fight at a time.</li>
          <li className={styles.rule}>• No shirts, no shoes.</li>
          <li className={styles.rule}>
            • Fights will go on as long as they have to.
          </li>
          <li className={styles.rule}>
            • If this is your first night at FIGHT CLUB, you HAVE to fight.
          </li>
        </ul>
        <p className={styles.lorem}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          quo tempora asperiores, illum enim cum qui fuga at corrupti id sint,
          adipisci inventore dolor facere odit, in veritatis dolore hic! Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Similique odit
          ullam aperiam nihil labore! Dignissimos facere, officiis expedita
          temporibus alias, id totam debitis modi, nostrum itaque animi
          explicabo incidunt hic! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Enim aspernatur incidunt nesciunt dolorum ea ipsam
          autem eum, quis, aliquam totam necessitatibus. Possimus rerum ex
          necessitatibus beatae, quas alias suscipit odit.
        </p>
      </div>
    </div>
  );
};

export default Rules;
