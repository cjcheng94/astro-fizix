import { h } from "preact";
import type { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
  onClick: () => void;
};

export default function Button({ children, onClick }: Props) {
  return (
    <button
      class="text-white font-mono border-2 px-2 py-1 mx-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
