import { css } from "styled-system/css";

export default function Home() {
  return (
    <h1
      className={css({
        color: "red",
      })}
    >
      Hello, Bento!
    </h1>
  );
}
