import type { KeyboardEvent } from "react";
export function tabKeyboard(
  event: KeyboardEvent<HTMLButtonElement>,
  selected: number,
  count: number,
  update: (index: number) => void,
) {
  let next = selected;
  if (event.key === "ArrowRight") next = (selected + 1) % count;
  else if (event.key === "ArrowLeft") next = (selected - 1 + count) % count;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = count - 1;
  else return;
  event.preventDefault();
  update(next);
  const buttons =
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]',
    );
  buttons?.[next]?.focus();
}
