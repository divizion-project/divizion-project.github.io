import { Fragment } from "react";
export function safeUrl(value: string) {
  return /^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(value) ? value : "#";
}
function Inline({ text }: { text: string }) {
  const tokens = text.split(
    /(\*\*.+?\*\*|`.+?`|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g,
  );
  return (
    <>
      {tokens.map((token, i) =>
        token.startsWith("**") ? (
          <strong key={i}>{token.slice(2, -2)}</strong>
        ) : token.startsWith("`") ? (
          <code key={i}>{token.slice(1, -1)}</code>
        ) : token.startsWith("[") ? (
          (() => {
            const m = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            return m ? (
              <a key={i} href={safeUrl(m[2])} rel="noopener noreferrer">
                {m[1]}
              </a>
            ) : (
              token
            );
          })()
        ) : (
          <Fragment key={i}>{token}</Fragment>
        ),
      )}
    </>
  );
}
export function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const output: React.ReactNode[] = [];
  let list: string[] = [];
  let code: string[] | null = null;
  const flush = () => {
    if (list.length) {
      output.push(
        <ul key={`list-${output.length}`}>
          {list.map((l, i) => (
            <li key={i}>
              <Inline text={l} />
            </li>
          ))}
        </ul>,
      );
      list = [];
    }
  };
  for (const [i, line] of lines.entries()) {
    if (line.startsWith("```")) {
      flush();
      if (code) {
        output.push(
          <pre key={i}>
            <code>{code.join("\n")}</code>
          </pre>,
        );
        code = null;
      } else code = [];
      continue;
    }
    if (code) {
      code.push(line);
      continue;
    }
    const heading = line.match(/^(#{1,6})\s+(.*)/);
    if (heading) {
      flush();
      output.push(
        heading[1].length <= 2 ? (
          <h2 key={i}>
            <Inline text={heading[2]} />
          </h2>
        ) : (
          <h3 key={i}>
            <Inline text={heading[2]} />
          </h3>
        ),
      );
    } else if (/^\s*[-*]\s/.test(line))
      list.push(line.replace(/^\s*[-*]\s/, ""));
    else {
      flush();
      if (/^\s*([-*_])(?:\s*\1){2,}\s*$/.test(line))
        output.push(<hr key={i} />);
      else if (line.trim())
        output.push(
          <p key={i}>
            <Inline text={line} />
          </p>,
        );
    }
  }
  flush();
  if (code) output.push(<pre key="remaining-code">{code.join("\n")}</pre>);
  return <div className="markdown">{output}</div>;
}
