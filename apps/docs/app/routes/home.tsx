import { css } from "styled-system/css";
import { Box } from "~/modules/Box";

export default function Home() {
  return (
    <>
      <h1
        className={css({
          color: "red.700",
        })}
      >
        Hello, Korama!
      </h1>
      <Box>aho</Box>
    </>
  );
}
