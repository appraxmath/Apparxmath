"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MathText, normalizeSuperscriptInput } from "@/components/math-text";

type GraphResult = {
  path: string;
  xTicks: number[];
  yTicks: number[];
  yMin: number;
  yMax: number;
  error: string | null;
};

function tokenize(source: string): string[] {
  const tokens: string[] = [];
  let index = 0;

  while (index < source.length) {
    const rest = source.slice(index);
    const whitespace = /^\s+/.exec(rest);
    if (whitespace) {
      index += whitespace[0].length;
      continue;
    }

    const number = /^(?:\d+(?:\.\d*)?|\.\d+)/.exec(rest);
    if (number) {
      tokens.push(number[0]);
      index += number[0].length;
      continue;
    }

    const character = source[index].toLowerCase();
    if (character === "x" || "+-*/^()".includes(character)) {
      tokens.push(character);
      index += 1;
      continue;
    }

    throw new Error(`I do not recognize "${source[index]}". Use numbers, x, and + − × ÷ ^ with parentheses.`);
  }

  if (tokens.length === 0) {
    throw new Error("Enter a function first, for example 2^x.");
  }

  return tokens;
}

function compileExpression(source: string): (x: number) => number {
  const cleaned = normalizeSuperscriptInput(source).replace(/^\s*y\s*=\s*/i, "").trim().replace(/[−–]/g, "-").replace(/×/g, "*").replace(/÷/g, "/");
  if (cleaned.length > 100) {
    throw new Error("Please keep the expression under 100 characters.");
  }

  const tokens = tokenize(cleaned);
  let position = 0;
  const peek = () => tokens[position];
  const take = () => tokens[position++];

  function parsePrimary(): (x: number) => number {
    const token = take();
    if (token === undefined) throw new Error("The expression ends too early.");
    if (token === "x") return (x) => x;

    if (token === "(") {
      const value = parseExpression();
      if (take() !== ")") throw new Error("A closing parenthesis is missing.");
      return value;
    }

    const number = Number(token);
    if (Number.isFinite(number) && token !== "") return () => number;
    throw new Error(`"${token}" is not a valid number or variable.`);
  }

  function parsePower(): (x: number) => number {
    const base = parsePrimary();
    if (peek() === "^") {
      take();
      const exponent = parseUnary();
      return (x) => Math.pow(base(x), exponent(x));
    }
    return base;
  }

  function parseUnary(): (x: number) => number {
    if (peek() === "+") {
      take();
      return parseUnary();
    }
    if (peek() === "-") {
      take();
      const value = parseUnary();
      return (x) => -value(x);
    }
    return parsePower();
  }

  function startsPrimary(token: string | undefined): boolean {
    return token === "x" || token === "(" || (token !== undefined && /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(token));
  }

  function parseTerm(): (x: number) => number {
    let value = parseUnary();

    while (peek() === "*" || peek() === "/" || startsPrimary(peek())) {
      const operator = peek() === "*" || peek() === "/" ? take() : "*";
      const next = parseUnary();
      const previous = value;
      value = operator === "/"
        ? (x) => previous(x) / next(x)
        : (x) => previous(x) * next(x);
    }

    return value;
  }

  function parseExpression(): (x: number) => number {
    let value = parseTerm();

    while (peek() === "+" || peek() === "-") {
      const operator = take();
      const next = parseTerm();
      const previous = value;
      value = operator === "-"
        ? (x) => previous(x) - next(x)
        : (x) => previous(x) + next(x);
    }

    return value;
  }

  const calculate = parseExpression();
  if (position !== tokens.length) {
    throw new Error(`There is an extra "${peek()}" in the expression. Check the operators and parentheses.`);
  }

  return (x) => {
    const result = calculate(x);
    if (!Number.isFinite(result)) return Number.NaN;
    return result;
  };
}

function formatTick(value: number): string {
  if (Math.abs(value) >= 1000 || (Math.abs(value) > 0 && Math.abs(value) < 0.01)) {
    return value.toExponential(1);
  }
  return Number(value.toFixed(2)).toString();
}

function createGraph(expression: string, range: number): GraphResult {
  try {
    const calculate = compileExpression(expression);
    const count = 500;
    const samples = Array.from({ length: count + 1 }, (_, index) => {
      const x = -range + (2 * range * index) / count;
      return { x, y: calculate(x) };
    });
    const visibleValues = samples
      .map((sample) => sample.y)
      .filter((value) => Number.isFinite(value) && Math.abs(value) < 1_000_000);

    if (visibleValues.length === 0) {
      throw new Error("This function has no real values in the displayed x-range.");
    }

    let yMin = Math.min(...visibleValues);
    let yMax = Math.max(...visibleValues);
    const spread = yMax - yMin;
    const padding = spread === 0 ? 1 : spread * 0.12;
    yMin = Math.min(0, yMin - padding);
    yMax = Math.max(0, yMax + padding);

    const left = 58;
    const right = 620;
    const top = 24;
    const bottom = 326;
    const xToSvg = (x: number) => left + ((x + range) / (2 * range)) * (right - left);
    const yToSvg = (y: number) => top + ((yMax - y) / (yMax - yMin)) * (bottom - top);

    let path = "";
    let drawing = false;
    for (const sample of samples) {
      const isVisible = Number.isFinite(sample.y) && sample.y >= yMin && sample.y <= yMax;
      if (!isVisible) {
        drawing = false;
        continue;
      }
      path += `${drawing ? "L" : "M"} ${xToSvg(sample.x).toFixed(2)} ${yToSvg(sample.y).toFixed(2)} `;
      drawing = true;
    }

    return {
      path,
      xTicks: Array.from({ length: 5 }, (_, index) => -range + (2 * range * index) / 4),
      yTicks: Array.from({ length: 5 }, (_, index) => yMin + ((yMax - yMin) * index) / 4),
      yMin,
      yMax,
      error: null
    };
  } catch (error) {
    return {
      path: "",
      xTicks: [],
      yTicks: [],
      yMin: -5,
      yMax: 5,
      error: error instanceof Error ? error.message : "Please check your expression."
    };
  }
}

const examples = [
  { label: "Basic growth", value: "2^x" },
  { label: "Shifted graph", value: "3^(x-1)+2" },
  { label: "Exponential decay", value: "0.5^x" },
  { label: "Reflected graph", value: "-2^x+4" }
];

export default function ExponentialGraphPage() {
  const [expression, setExpression] = useState("2^x");
  const [range, setRange] = useState(5);
  const graph = useMemo(() => createGraph(expression, range), [expression, range]);

  const left = 58;
  const right = 620;
  const top = 24;
  const bottom = 326;
  const xToSvg = (x: number) => left + ((x + range) / (2 * range)) * (right - left);
  const yToSvg = (y: number) => top + ((graph.yMax - y) / (graph.yMax - graph.yMin)) * (bottom - top);
  const zeroY = yToSvg(0);
  const zeroX = xToSvg(0);

  return (
    <>
      <SiteHeader />
      <main className="container min-h-[70vh] py-12 sm:py-16">
        <Link href="/courses" className="text-sm font-semibold text-[var(--brand)] hover:underline">← Back to courses</Link>
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[.15em] text-[var(--brand)]">Interactive mathematics tool</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Exponential Graph Explorer</h1>
          <p className="mt-4 text-base leading-7 text-[var(--muted)]">
            Enter an exponential function and the graph updates as you type. Try changing the base, shifting the curve, or reflecting it across the x-axis.
          </p>
        </div>

        <section className="mt-9 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,.8fr)]">
          <div className="rounded-3xl border border-[var(--line)] bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Live graph</p>
                <MathText className="mt-1 block text-lg font-extrabold" text={`y = ${expression || "…"}`} />
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">Auto-updating</span>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 bg-white">
              <svg viewBox="0 0 660 370" role="img" aria-label={`Graph of y equals ${expression}`} className="block h-auto w-full">
                {graph.xTicks.map((tick) => (
                  <g key={`x-${tick}`}>
                    <line x1={xToSvg(tick)} y1={top} x2={xToSvg(tick)} y2={bottom} stroke="#e8edf5" strokeWidth="1" />
                    <text x={xToSvg(tick)} y="348" textAnchor="middle" fontSize="11" fill="#64748b">{formatTick(tick)}</text>
                  </g>
                ))}
                {graph.yTicks.map((tick) => (
                  <g key={`y-${tick}`}>
                    <line x1={left} y1={yToSvg(tick)} x2={right} y2={yToSvg(tick)} stroke="#e8edf5" strokeWidth="1" />
                    <text x="48" y={yToSvg(tick) + 4} textAnchor="end" fontSize="11" fill="#64748b">{formatTick(tick)}</text>
                  </g>
                ))}
                <line x1={left} y1={zeroY} x2={right} y2={zeroY} stroke="#64748b" strokeWidth="1.5" />
                <line x1={zeroX} y1={top} x2={zeroX} y2={bottom} stroke="#64748b" strokeWidth="1.5" />
                <text x="628" y={Math.max(top + 12, zeroY - 8)} fontSize="12" fill="#475569">x</text>
                <text x={zeroX + 9} y="19" fontSize="12" fill="#475569">y</text>
                {graph.path && <path d={graph.path} fill="none" stroke="#3157d5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
                {graph.error && <text x="340" y="180" textAnchor="middle" fontSize="13" fill="#b45309">Enter a valid function to draw the graph</text>}
              </svg>
            </div>
            {graph.error ? (
              <p role="alert" className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">{graph.error}</p>
            ) : (
              <p className="mt-3 text-xs text-slate-500">Displayed domain: −{range} ≤ x ≤ {range}. The vertical scale adjusts automatically.</p>
            )}
          </div>

          <aside className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-6">
            <label htmlFor="exponential-expression" className="text-sm font-extrabold">Enter your function</label>
            <p className="mt-1 text-sm leading-6 text-slate-500">Type the right-hand side of y =, or include y = in your input.</p>
            <input
              id="exponential-expression"
              value={expression}
              onChange={(event) => setExpression(event.target.value)}
              spellCheck={false}
              autoComplete="off"
              className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-lg outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-blue-100"
              placeholder="Example: 2^x"
            />
            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Try an example</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {examples.map((example) => (
                  <button key={example.value} type="button" onClick={() => setExpression(example.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-left transition hover:border-[var(--brand)] hover:bg-blue-50">
                    <span className="block text-xs text-slate-500">{example.label}</span>
                    <MathText className="mt-1 block font-mono text-sm font-bold text-[var(--ink)]" text={example.value} />
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="text-sm font-extrabold">Horizontal viewing range</p>
              <div className="mt-3 flex gap-2">
                {[3, 5, 8].map((value) => (
                  <button key={value} type="button" onClick={() => setRange(value)} aria-pressed={range === value} className={`flex-1 rounded-xl px-3 py-2 text-sm font-bold transition ${range === value ? "bg-[var(--brand)] text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                    ±{value}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-blue-50 p-4">
              <p className="text-sm font-extrabold text-[var(--ink)]">Supported symbols</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">x, numbers, +, −, *, /, ^, and parentheses. You can also write multiplication without a symbol, such as 2x.</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">Tip: use ^ for powers. For example, write 2^x, not 2x.</p>
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-3xl bg-[var(--ink)] p-6 text-white sm:p-8">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-200">Learn while you explore</p>
          <h2 className="mt-2 text-2xl font-black">What changes the shape of an exponential graph?</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div><p className="font-bold">The base</p><p className="mt-1 text-sm leading-6 text-slate-300">A base greater than 1 gives growth; a base between 0 and 1 gives decay.</p></div>
            <div><p className="font-bold">Horizontal shifts</p><p className="mt-1 text-sm leading-6 text-slate-300">Changing x to (x − h) moves the graph right by h units.</p></div>
            <div><p className="font-bold">Vertical shifts</p><p className="mt-1 text-sm leading-6 text-slate-300">Adding k outside the power moves the graph up by k units.</p></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
