import { h } from "preact";
import type { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
  onClick?: () => void;
  highlighted?: boolean;
};

export default function Button({ children, onClick, highlighted }: Props) {
  const buttonClass = `border-2 px-2 py-1 mr-4 my-2 ${
    highlighted ? "text-lime-300 border-lime-300" : "text-white border-white"
  }`;

  return (
    <button class={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}
