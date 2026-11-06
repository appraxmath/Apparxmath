"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import nerdamer from "nerdamer";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useAppPreferences } from "@/components/app-preferences";

type Operation = "solve" | "simplify" | "factor" | "differentiate" | "integrate";
type Step = { titleEn: string; titleKm: string; bodyEn: string; bodyKm: string };
type Theory = { nameEn: string; nameKm: string; formula: string; explainEn: string; explainKm: string };
type History = { headingEn: string; headingKm: string; bodyEn: string; bodyKm: string; names: string[]; sources: { label: string; href: string }[] };
type Solution = { answer: string; steps: Step[]; theory: Theory; history: History; noticeEn?: string; noticeKm?: string };

const operationLabels: Record<Operation, { en: string; km: string }> = {
  solve: { en: "Solve an equation", km: "ដោះស្រាយសមីការ" },
  simplify: { en: "Simplify", km: "សម្រួលកន្សោម" },
  factor: { en: "Factor", km: "ដាក់ជាផលគុណកត្តា" },
  differentiate: { en: "Differentiate", km: "គណនាដេរីវេ" },
  integrate: { en: "Integrate", km: "គណនាអាំងតេក្រាល" }
};

const theoryByOperation: Record<Operation, Theory> = {
  solve: {
    nameEn: "The equality principle",
    nameKm: "គោលការណ៍សមភាព",
    formula: "a = b  ⇒  a + c = b + c",
    explainEn: "An equation stays balanced when we perform the same valid operation on both sides. For polynomial equations, factoring and the zero-product property may also help find the roots.",
    explainKm: "សមីការនៅតែមានសមភាព ប្រសិនបើយើងធ្វើប្រមាណវិធីដូចគ្នាដែលត្រឹមត្រូវលើអង្គទាំងពីរ។ សម្រាប់សមីការពហុធា ការបំបែកជាកត្តា និងគោលការណ៍ផលគុណសូន្យអាចជួយរកឫសបាន។"
  },
  simplify: {
    nameEn: "Algebraic properties",
    nameKm: "លក្ខណៈសម្បត្តិពិជគណិត",
    formula: "a(b + c) = ab + ac",
    explainEn: "The distributive, associative, and commutative properties let us expand brackets, rearrange terms, and combine like terms without changing the value of an expression.",
    explainKm: "លក្ខណៈចែក លក្ខណៈផ្គុំ និងលក្ខណៈប្ដូរទីតាំង អនុញ្ញាតឱ្យយើងបើកវង់ក្រចក រៀបចំតួ និងបូកតួដូចគ្នា ដោយមិនប្ដូរតម្លៃកន្សោម។"
  },
  factor: {
    nameEn: "The distributive property and zero-product property",
    nameKm: "លក្ខណៈចែក និងគោលការណ៍ផលគុណសូន្យ",
    formula: "ab + ac = a(b + c)   ·   ab = 0 ⇒ a = 0 or b = 0",
    explainEn: "Factoring reverses expansion: it rewrites a sum as a product. When a product equals zero, at least one factor must equal zero.",
    explainKm: "ការដាក់ជាផលគុណកត្តា គឺជាបញ្ច្រាសនៃការបើកវង់ក្រចក៖ បម្លែងផលបូកទៅជាផលគុណ។ នៅពេលផលគុណស្មើសូន្យ យ៉ាងហោចណាស់កត្តាមួយត្រូវស្មើសូន្យ។"
  },
  differentiate: {
    nameEn: "The derivative rules",
    nameKm: "ច្បាប់ដេរីវេ",
    formula: "d(xⁿ)/dx = n·xⁿ⁻¹",
    explainEn: "The derivative measures an instantaneous rate of change. The power rule applies to powers of the variable; sums, constants, products, quotients, and composite functions use their corresponding rules.",
    explainKm: "ដេរីវេបង្ហាញអត្រាបម្រែបម្រួលភ្លាមៗ។ ច្បាប់ស្វ័យគុណប្រើសម្រាប់ស្វ័យគុណនៃអថេរ ចំណែកផលបូក ចំនួនថេរ ផលគុណ ផលចែក និងអនុគមន៍ផ្សំ ប្រើច្បាប់រៀងៗខ្លួន។"
  },
  integrate: {
    nameEn: "Antiderivatives and the power rule",
    nameKm: "អនុដេរីវេ និងច្បាប់ស្វ័យគុណ",
    formula: "∫xⁿ dx = xⁿ⁺¹/(n + 1) + C,   n ≠ −1",
    explainEn: "An indefinite integral represents a family of antiderivatives. Differentiate the result to check it; C is the constant of integration.",
    explainKm: "អាំងតេក្រាលមិនកំណត់តំណាងឱ្យសំណុំអនុដេរីវេ។ អាចផ្ទៀងផ្ទាត់ចម្លើយដោយគណនាដេរីវេវិញ ហើយ C ជាចំនួនថេរអាំងតេក្រាល។"
  }
};

const historyByOperation: Record<Operation, History> = {
  solve: {
    headingEn: "Where this mathematical tradition comes from",
    headingKm: "ប្រវត្តិនៃគំនិតគណិតវិទ្យា",
    bodyEn: "Al-Khwarizmi helped organize algebra as a systematic mathematical discipline. People solved equations long before his work, so he should not be described as the inventor of all equation-solving.",
    bodyKm: "អាល់ខ្វារីស្មី បានចូលរួមរៀបចំពិជគណិតឱ្យក្លាយជាវិជ្ជាគណិតវិទ្យាដែលមានប្រព័ន្ធ។ មនុស្សបានដោះស្រាយសមីការមុនសម័យគាត់យូរមកហើយ ដូច្នេះមិនគួរនិយាយថាគាត់ជាអ្នកបង្កើតការដោះស្រាយសមីការទាំងអស់នោះទេ។",
    names: ["Muhammad ibn Musa al-Khwarizmi"],
    sources: [{ label: "Islam Museum — Al-Khwarizmi and algebra", href: "https://www.islam.museum/en/invention/algebra/" }]
  },
  simplify: {
    headingEn: "A long, shared algebraic history",
    headingKm: "ប្រវត្តិរួមនៃពិជគណិត",
    bodyEn: "Algebraic notation and techniques developed across many cultures over centuries. Al-Khwarizmi's influential ninth-century work helped establish algebra as an organized discipline; no single person invented all simplification rules.",
    bodyKm: "និមិត្តសញ្ញា និងបច្ចេកទេសពិជគណិតបានអភិវឌ្ឍឆ្លងកាត់វប្បធម៌ជាច្រើនអស់រយៈពេលរាប់សតវត្សរ៍។ ស្នាដៃសតវត្សទី៩ របស់អាល់ខ្វារីស្មី បានជួយបង្កើតពិជគណិតជាវិជ្ជាដែលមានប្រព័ន្ធ ប៉ុន្តែមិនមានបុគ្គលតែម្នាក់ដែលបង្កើតច្បាប់សម្រួលទាំងអស់ទេ។",
    names: ["Al-Khwarizmi", "Earlier Babylonian, Greek, Indian, and other mathematical traditions"],
    sources: [{ label: "Islam Museum — History of algebra", href: "https://www.islam.museum/en/invention/algebra/" }]
  },
  factor: {
    headingEn: "Factoring grew from algebra",
    headingKm: "ការដាក់ជាផលគុណកត្តាក្នុងពិជគណិត",
    bodyEn: "Factoring is a family of algebraic methods developed over time. It is not a single theorem invented by one named mathematician; different factorization methods have different histories.",
    bodyKm: "ការដាក់ជាផលគុណកត្តាជាបណ្ដុំវិធីសាស្ត្រពិជគណិតដែលបានអភិវឌ្ឍតាមពេលវេលា។ វាមិនមែនជាទ្រឹស្តីបទតែមួយដែលបង្កើតដោយគណិតវិទូម្នាក់នោះទេ។",
    names: ["Many contributors across the history of algebra"],
    sources: [{ label: "Islam Museum — History of algebra", href: "https://www.islam.museum/en/invention/algebra/" }]
  },
  differentiate: {
    headingEn: "The development of calculus",
    headingKm: "ការអភិវឌ្ឍកាល់គុល",
    bodyEn: "Isaac Newton and Gottfried Wilhelm Leibniz independently developed the central ideas and notation of calculus in the seventeenth century. The history of calculus also includes earlier work on tangents, areas, and infinite processes.",
    bodyKm: "អ៊ីសាក់ ញូតុន និង ហ្គត់ហ្វ្រីដ វីលហែលម៍ ឡៃប្នីត្ស បានអភិវឌ្ឍគំនិតសំខាន់ៗ និងនិមិត្តសញ្ញាកាល់គុលដោយឯករាជ្យពីគ្នា ក្នុងសតវត្សទី១៧។ ប្រវត្តិកាល់គុលក៏មានការសិក្សាមុននេះអំពីបន្ទាត់ប៉ះ ផ្ទៃក្រឡា និងដំណើរការអនន្តផងដែរ។",
    names: ["Isaac Newton", "Gottfried Wilhelm Leibniz"],
    sources: [
      { label: "Stanford Encyclopedia of Philosophy — Newton", href: "https://plato.stanford.edu/entries/newton/" },
      { label: "McGill — History of mathematics: Newton and Leibniz", href: "https://www.math.mcgill.ca/darmon/courses/history/katz.pdf" }
    ]
  },
  integrate: {
    headingEn: "The development of integral calculus",
    headingKm: "ការអភិវឌ្ឍអាំងតេក្រាលកាល់គុល",
    bodyEn: "Newton and Leibniz independently shaped calculus. Leibniz's integral notation became widely used, while earlier mathematicians such as Archimedes had already developed important methods for finding areas and volumes.",
    bodyKm: "ញូតុន និង ឡៃប្នីត្ស បានរួមចំណែកអភិវឌ្ឍកាល់គុលដោយឯករាជ្យពីគ្នា។ និមិត្តសញ្ញាអាំងតេក្រាលរបស់ឡៃប្នីត្សបានប្រើប្រាស់យ៉ាងទូលំទូលាយ ខណៈគណិតវិទូមុនៗដូចជា Archimedes បានអភិវឌ្ឍវិធីសំខាន់ៗសម្រាប់រកផ្ទៃក្រឡា និងមាឌរួចមកហើយ។",
    names: ["Isaac Newton", "Gottfried Wilhelm Leibniz", "Archimedes"],
    sources: [
      { label: "Stanford Encyclopedia of Philosophy — Newton", href: "https://plato.stanford.edu/entries/newton/" },
      { label: "McGill — History of mathematics: Newton and Leibniz", href: "https://www.math.mcgill.ca/darmon/courses/history/katz.pdf" }
    ]
  }
};

function normalizeInput(input: string) {
  const cleaned = input.trim().replace(/−/g, "-").replace(/×/g, "*").replace(/÷/g, "/");
  if (!cleaned) throw new Error("Enter a mathematical expression first.");
  if (cleaned.length > 180) throw new Error("Please keep the expression under 180 characters.");
  const equalityParts = cleaned.split("=");
  if (equalityParts.length > 2) throw new Error("Enter one equation with only one equals sign.");
  return {
    cleaned,
    normalized: equalityParts.length === 2 ? `(${equalityParts[0]})-(${equalityParts[1]})` : cleaned,
    hasEquals: equalityParts.length === 2
  };
}

function solveProblem(input: string, operation: Operation, variable: string): Solution {
  if (!/^[a-zA-Z]$/.test(variable)) {
    throw new Error("Use one letter for the variable, such as x, y, n, or t.");
  }

  const { cleaned, normalized, hasEquals } = normalizeInput(input);
  if (operation !== "solve" && hasEquals) throw new Error("For this operation, enter an expression without an equals sign. Choose Solve an equation to solve an equation.");
  let answer = "";
  let steps: Step[] = [];

  if (operation === "solve") {
    const equation = nerdamer(normalized);
    const solutions = nerdamer.solve(normalized, variable);
    const roots = solutions.elements.map((root) => root.text());
    answer = roots.length ? roots.map((root, index) => `${variable}${roots.length > 1 ? `₍${index + 1}₎` : ""} = ${root}`).join("    ") : solutions.text();
    steps = [{
      titleEn: "1. Identify the unknown",
      titleKm: "១. កំណត់អថេរដែលត្រូវរក",
      bodyEn: `We are solving for ${variable}. ${hasEquals ? "The input is an equation." : "The expression is interpreted as equal to zero."}`,
      bodyKm: `យើងត្រូវរកតម្លៃអថេរ ${variable}។ ${hasEquals ? "អ្វីដែលបានបញ្ចូលគឺជាសមីការ។" : "កន្សោមនេះត្រូវបានចាត់ទុកថាស្មើសូន្យ។"}`
    }, {
      titleEn: "2. Put the equation in zero form",
      titleKm: "២. រៀបចំសមីការឱ្យស្មើសូន្យ",
      bodyEn: `Move the right-hand side to the left: ${normalized} = 0. This gives one expression whose roots are the required solutions.`,
      bodyKm: `យកអង្គខាងស្ដាំមកអង្គខាងឆ្វេង៖ ${normalized} = 0។ យើងទទួលបានកន្សោមមួយដែលឫសរបស់វាជាចម្លើយដែលត្រូវរក។`
    }];

    const firstDerivative = nerdamer.diff(normalized, variable).text();
    const secondDerivative = nerdamer.diff(normalized, variable, 2).text();
    const thirdDerivative = nerdamer.diff(normalized, variable, 3).text();
    if (secondDerivative === "0" && !firstDerivative.includes(variable) && firstDerivative !== "0") {
      const slope = nerdamer(firstDerivative).text();
      const intercept = equation.evaluate({ [variable]: 0 }).text();
      steps.push({
        titleEn: "3. Use the linear-equation method",
        titleKm: "៣. ប្រើវិធីសាស្ត្រសមីការដឺក្រេទី១",
        bodyEn: `The equation has the form ${slope}·${variable} + (${intercept}) = 0. Isolate the variable: ${variable} = −(${intercept})/(${slope}).`,
        bodyKm: `សមីការមានទម្រង់ ${slope}·${variable} + (${intercept}) = 0។ ញែកអថេរចេញ៖ ${variable} = −(${intercept})/(${slope})។`
      });
    } else if (thirdDerivative === "0" && secondDerivative !== "0" && !secondDerivative.includes(variable)) {
      const a = nerdamer(`(${secondDerivative})/2`).text();
      const b = nerdamer(normalized).diff(variable).evaluate({ [variable]: 0 }).text();
      const c = equation.evaluate({ [variable]: 0 }).text();
      const delta = nerdamer(`(${b})^2-4*(${a})*(${c})`).text();
      steps.push({
        titleEn: "3. Identify the quadratic coefficients",
        titleKm: "៣. កំណត់មេគុណនៃសមីការដឺក្រេទី២",
        bodyEn: `Write the equation as a·${variable}² + b·${variable} + c = 0. Here a = ${a}, b = ${b}, and c = ${c}.`,
        bodyKm: `សរសេរសមីការជាទម្រង់ a·${variable}² + b·${variable} + c = 0។ ក្នុងនេះ a = ${a}, b = ${b} និង c = ${c}។`
      }, {
        titleEn: "4. Apply the quadratic formula",
        titleKm: "៤. ប្រើរូបមន្តសមីការដឺក្រេទី២",
        bodyEn: `The discriminant is Δ = b² − 4ac = ${delta}. Then ${variable} = (−b ± √Δ)/(2a). The solution set is shown above.`,
        bodyKm: `ឌីសគ្រីមីណង់គឺ Δ = b² − 4ac = ${delta}។ បន្ទាប់មក ${variable} = (−b ± √Δ)/(2a)។ សំណុំចម្លើយបង្ហាញនៅខាងលើ។`
      });
    } else {
      steps.push({
        titleEn: "3. Apply an appropriate solving method",
        titleKm: "៣. អនុវត្តវិធីដោះស្រាយដែលសមស្រប",
        bodyEn: "The symbolic engine attempts supported exact algebraic methods and, for some equations, numerical methods. It does not guarantee that every possible root of every transcendental or periodic equation will be found.",
        bodyKm: "កម្មវិធីគណនានិមិត្តសញ្ញានឹងព្យាយាមប្រើវិធីពិជគណិតដែលគាំទ្រ និងសម្រាប់សមីការខ្លះ វាអាចប្រើវិធីលេខប្រហាក់ប្រហែល។ វាមិនធានាថានឹងរកឃើញឫសទាំងអស់នៃសមីការអនុគមន៍អធិប្បាយ ឬសមីការខួបគ្រប់ករណីទេ។"
      });
    }
    steps.push({
      titleEn: "Final result",
      titleKm: "លទ្ធផលចុងក្រោយ",
      bodyEn: roots.length ? `The solver returned ${roots.length} solution${roots.length === 1 ? "" : "s"}. Check that each value satisfies the original equation.` : "No finite solution was returned. This may mean there is no solution, infinitely many solutions, or that this form is not supported by the solver.",
      bodyKm: roots.length ? `កម្មវិធីបានផ្ដល់ចម្លើយ ${roots.length}។ សូមផ្ទៀងផ្ទាត់ថាតម្លៃនីមួយៗបំពេញសមីការដើម។` : "កម្មវិធីមិនបានផ្ដល់ចម្លើយចំនួនកំណត់ទេ។ នេះអាចមានន័យថាគ្មានចម្លើយ មានចម្លើយអនន្ត ឬទម្រង់នេះមិនត្រូវបានគាំទ្រ។"
    });
  } else if (operation === "simplify") {
    const result = nerdamer(cleaned).simplify().text();
    answer = result;
    steps = [
      { titleEn: "1. Read the expression", titleKm: "១. ពិនិត្យកន្សោម", bodyEn: `Start with ${cleaned}. Identify brackets, powers, and like terms.`, bodyKm: `ចាប់ផ្ដើមពី ${cleaned}។ កំណត់វង់ក្រចក ស្វ័យគុណ និងតួដូចគ្នា។` },
      { titleEn: "2. Apply algebraic properties", titleKm: "២. ប្រើលក្ខណៈសម្បត្តិពិជគណិត", bodyEn: "Use valid expansion, rearrangement, exponent, and like-term rules. The same value must be preserved at every step.", bodyKm: "ប្រើច្បាប់បើកវង់ក្រចក រៀបចំតួ ស្វ័យគុណ និងបូកតួដូចគ្នាដែលត្រឹមត្រូវ។ តម្លៃកន្សោមត្រូវនៅដដែលគ្រប់ជំហាន។" },
      { titleEn: "3. Write the simplified form", titleKm: "៣. សរសេរទម្រង់សម្រួល", bodyEn: `The symbolic simplifier gives ${result}.`, bodyKm: `កម្មវិធីសម្រួលនិមិត្តសញ្ញាផ្ដល់លទ្ធផល ${result}។` }
    ];
  } else if (operation === "factor") {
    const result = nerdamer.factor(cleaned).text();
    answer = result;
    steps = [
      { titleEn: "1. Inspect the expression", titleKm: "១. ពិនិត្យកន្សោម", bodyEn: `Start with ${cleaned}. Look for common factors or recognizable patterns.`, bodyKm: `ចាប់ផ្ដើមពី ${cleaned}។ ស្វែងរកកត្តារួម ឬទម្រង់ដែលអាចសម្គាល់បាន។` },
      { titleEn: "2. Rewrite as a product", titleKm: "២. បម្លែងទៅជាផលគុណ", bodyEn: "Use common-factor, grouping, or polynomial factorization methods when they apply.", bodyKm: "ប្រើវិធីកត្តារួម ការដាក់ជាក្រុម ឬវិធីបំបែកពហុធា នៅពេលអាចប្រើបាន។" },
      { titleEn: "3. Check by expanding", titleKm: "៣. ផ្ទៀងផ្ទាត់ដោយបើកវង់ក្រចកវិញ", bodyEn: `The factorized form is ${result}. Expanding it should reproduce the original expression.`, bodyKm: `ទម្រង់ផលគុណកត្តាគឺ ${result}។ បើកវង់ក្រចកវិញគួរតែទទួលបានកន្សោមដើម។` }
    ];
  } else if (operation === "differentiate") {
    const result = nerdamer.diff(cleaned, variable).text();
    answer = result;
    steps = [
      { titleEn: "1. Identify the function and variable", titleKm: "១. កំណត់អនុគមន៍ និងអថេរ", bodyEn: `Differentiate ${cleaned} with respect to ${variable}.`, bodyKm: `គណនាដេរីវេនៃ ${cleaned} ធៀបនឹងអថេរ ${variable}។` },
      { titleEn: "2. Choose the derivative rules", titleKm: "២. ជ្រើសរើសច្បាប់ដេរីវេ", bodyEn: "The power rule is used for powers; sum and constant-multiple rules handle sums and coefficients. Product, quotient, and chain rules are used when their structures appear.", bodyKm: "ច្បាប់ស្វ័យគុណប្រើសម្រាប់ស្វ័យគុណ ច្បាប់ផលបូក និងចំនួនថេរប្រើសម្រាប់ផលបូក និងមេគុណ។ ច្បាប់ផលគុណ ផលចែក និងខ្សែសង្វាក់ប្រើនៅពេលមានទម្រង់ទាំងនោះ។" },
      { titleEn: "3. Differentiate and simplify", titleKm: "៣. គណនាដេរីវេ និងសម្រួល", bodyEn: `The symbolic derivative is ${result}.`, bodyKm: `ដេរីវេតាមនិមិត្តសញ្ញាគឺ ${result}។` }
    ];
  } else {
    const result = nerdamer.integrate(cleaned, variable).text();
    answer = `${result} + C`;
    steps = [
      { titleEn: "1. Identify the integrand", titleKm: "១. កំណត់កន្សោមក្នុងអាំងតេក្រាល", bodyEn: `Integrate ${cleaned} with respect to ${variable}.`, bodyKm: `គណនាអាំងតេក្រាលនៃ ${cleaned} ធៀបនឹងអថេរ ${variable}។` },
      { titleEn: "2. Apply antiderivative rules", titleKm: "២. ប្រើច្បាប់អនុដេរីវេ", bodyEn: "Use linearity and the relevant antiderivative rules. For a power, ∫xⁿ dx = xⁿ⁺¹/(n+1) + C when n is not −1.", bodyKm: "ប្រើលក្ខណៈលីនេអ៊ែរ និងច្បាប់អនុដេរីវេដែលសមស្រប។ សម្រាប់ស្វ័យគុណ ∫xⁿ dx = xⁿ⁺¹/(n+1) + C នៅពេល n មិនស្មើ −1។" },
      { titleEn: "3. Include the constant", titleKm: "៣. បន្ថែមចំនួនថេរ", bodyEn: `The antiderivative is ${answer}. The constant C is included because the derivative of any constant is zero.`, bodyKm: `អនុដេរីវេគឺ ${answer}។ ត្រូវបន្ថែមចំនួនថេរ C ព្រោះដេរីវេនៃចំនួនថេរគឺសូន្យ។` }
    ];
  }

  return {
    answer,
    steps,
    theory: theoryByOperation[operation],
    history: historyByOperation[operation],
    noticeEn: "This is a first teaching release. The engine can calculate supported symbolic results, while the bilingual steps explain the method at a learning level. For unfamiliar or more advanced forms, compare the method with your textbook or teacher.",
    noticeKm: "នេះជាកំណែដំបូងសម្រាប់ការសិក្សា។ កម្មវិធីអាចគណនាលទ្ធផលនិមិត្តសញ្ញាដែលគាំទ្រ ហើយជំហានពីរភាសាពន្យល់វិធីសាស្ត្រកម្រិតមូលដ្ឋាន។ សម្រាប់ទម្រង់មិនស្គាល់ ឬកម្រិតខ្ពស់ សូមផ្ទៀងផ្ទាត់ជាមួយសៀវភៅ ឬគ្រូ។"
  };
}

export default function Solv3Page() {
  const { language } = useAppPreferences();
  const isKhmer = language === "km";
  const [problem, setProblem] = useState("x^2 - 5*x + 6 = 0");
  const [operation, setOperation] = useState<Operation>("solve");
  const [variable, setVariable] = useState("x");
  const [result, setResult] = useState<Solution | null>(null);
  const [error, setError] = useState("");
  const [showBoth, setShowBoth] = useState(true);

  const examples = useMemo(() => [
    { label: isKhmer ? "សមីការដឺក្រេទី២" : "Quadratic equation", value: "x^2 - 5*x + 6 = 0", op: "solve" as Operation },
    { label: isKhmer ? "សម្រួលកន្សោម" : "Simplify", value: "2*(x+3)+x", op: "simplify" as Operation },
    { label: isKhmer ? "ដាក់ជាកត្តា" : "Factor", value: "x^2 - 9", op: "factor" as Operation },
    { label: isKhmer ? "ដេរីវេ" : "Derivative", value: "3*x^2 + 2*x", op: "differentiate" as Operation },
    { label: isKhmer ? "អាំងតេក្រាល" : "Integral", value: "4*x^3", op: "integrate" as Operation }
  ], [isKhmer]);

  function handleSolve() {
    setError("");
    setResult(null);
    try {
      setResult(solveProblem(problem, operation, variable));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The expression could not be processed. Check the input and try again.");
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="container min-h-[70vh] py-12 sm:py-16">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[.16em] text-[var(--brand)]">ApparxMath · learning solver</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Solv3</h1>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">
              {isKhmer
                ? "ដោះស្រាយលំហាត់គណិតវិទ្យា ហើយរៀនពីមូលហេតុនៃជំហាននីមួយៗ ជាភាសាខ្មែរ និងអង់គ្លេស។"
                : "Solve mathematics problems and learn why each step works, with explanations in both Khmer and English."}
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white p-3 text-xs text-slate-500">
            <p className="font-bold text-[var(--ink)]">{isKhmer ? "របៀបបង្ហាញភាសា" : "Explanation language"}</p>
            <button type="button" onClick={() => setShowBoth((current) => !current)} className="mt-2 rounded-lg bg-blue-50 px-3 py-2 font-bold text-[var(--brand)]">
              {showBoth ? (isKhmer ? "បង្ហាញខ្មែរ + English" : "Showing Khmer + English") : (isKhmer ? "បង្ហាញតែភាសាខ្មែរ" : "Show bilingual explanations")}
            </button>
          </div>
        </div>

        <section className="mt-9 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,.9fr)]">
          <div className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-7">
            <label htmlFor="solv3-problem" className="text-sm font-extrabold">{isKhmer ? "បញ្ចូលលំហាត់គណិតវិទ្យា" : "Enter your math problem"}</label>
            <textarea
              id="solv3-problem"
              value={problem}
              onChange={(event) => setProblem(event.target.value)}
              rows={3}
              spellCheck={false}
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-mono text-lg text-[var(--ink)] outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-blue-100"
              placeholder="Example: x^2 - 5*x + 6 = 0"
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="solv3-operation" className="text-xs font-bold uppercase tracking-wide text-slate-500">{isKhmer ? "ប្រភេទប្រមាណវិធី" : "Operation"}</label>
                <select id="solv3-operation" value={operation} onChange={(event) => setOperation(event.target.value as Operation)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold">
                  {(Object.keys(operationLabels) as Operation[]).map((key) => <option key={key} value={key}>{isKhmer ? operationLabels[key].km : operationLabels[key].en}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="solv3-variable" className="text-xs font-bold uppercase tracking-wide text-slate-500">{isKhmer ? "អថេរ" : "Variable"}</label>
                <input id="solv3-variable" value={variable} onChange={(event) => setVariable(event.target.value)} maxLength={1} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold" />
              </div>
            </div>
            <button type="button" onClick={handleSolve} className="mt-5 w-full rounded-xl bg-[var(--brand)] px-5 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-[var(--brand-dark)]">
              {isKhmer ? "ដោះស្រាយ និងពន្យល់" : "Solve and explain"}
            </button>
            {error && <p role="alert" className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">{error}</p>}
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{isKhmer ? "សាកល្បងលំហាត់" : "Try an example"}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {examples.map((example) => (
                  <button key={example.label} type="button" onClick={() => { setProblem(example.value); setOperation(example.op); setError(""); }} className="rounded-xl border border-slate-200 px-3 py-2 text-left text-xs font-semibold text-slate-600 transition hover:border-[var(--brand)] hover:bg-blue-50">
                    {example.label}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-5 text-xs leading-5 text-slate-500">
              {isKhmer
                ? "សរសេរគុណដោយប្រើ * និងស្វ័យគុណដោយប្រើ ^។ ឧទាហរណ៍ x^2 មានន័យថា x ការ៉េ។"
                : "Use * for multiplication and ^ for powers. For example, x^2 means x squared. You may also use brackets and common functions such as sin(x), cos(x), and log(x)."}
            </p>
          </div>

          <aside className="rounded-3xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-7">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{isKhmer ? "ទ្រឹស្តីដែលពាក់ព័ន្ធ" : "Theory behind the method"}</p>
            <h2 className="mt-2 text-xl font-black">{isKhmer ? "រៀនពីគោលការណ៍ មិនមែនត្រឹមចម្លើយ" : "Understand the rule, not only the answer"}</h2>
            <div className="mt-5 rounded-2xl bg-blue-50 p-4">
              <p className="font-bold text-[var(--ink)]">{isKhmer ? "គោលការណ៍សំខាន់ៗ" : "Core principles"}</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <li>• {isKhmer ? "សមភាព និងប្រមាណវិធីសមមូល" : "Equality and equivalent operations"}</li>
                <li>• {isKhmer ? "ច្បាប់ពិជគណិត និងស្វ័យគុណ" : "Algebraic and exponent rules"}</li>
                <li>• {isKhmer ? "ច្បាប់ដេរីវេ និងអនុដេរីវេ" : "Differentiation and integration rules"}</li>
              </ul>
            </div>
            <div className="mt-5 rounded-2xl border border-slate-100 p-4">
              <p className="font-bold">{isKhmer ? "ប្រភពប្រវត្តិសាស្ត្រ" : "Historical context"}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {isKhmer
                  ? "យើងនឹងភ្ជាប់ទ្រឹស្តីនីមួយៗទៅនឹងប្រវត្តិអ្នកគណិតវិទូ និងអ្នកវិទ្យាសាស្ត្រ ដោយបែងចែកឱ្យច្បាស់រវាងការរួមចំណែក និងសម្រង់សម្ដីដែលអាចផ្ទៀងផ្ទាត់បាន។"
                  : "Each theory is connected to the history of mathematicians and scientists. Contributions are distinguished from direct quotations that can actually be verified."}
              </p>
              <a href="https://galileo.ou.edu/exhibits/assayer-early-state.html" target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-bold text-[var(--brand)] hover:underline">{isKhmer ? "អានប្រភពអំពី Galileo →" : "Read the Galileo source →"}</a>
            </div>
          </aside>
        </section>

        {result && (
          <section className="mt-8 space-y-6" aria-live="polite">
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">{isKhmer ? "ចម្លើយ" : "Answer"}</p>
              <p className="mt-3 break-words font-mono text-2xl font-black text-emerald-950">{result.answer}</p>
            </div>

            <div className="rounded-3xl border border-[var(--line)] bg-white p-5 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--brand)]">{isKhmer ? "ការពន្យល់ជាជំហានៗ" : "Step-by-step explanation"}</p>
              <div className="mt-5 space-y-4">
                {result.steps.map((step, index) => (
                  <article key={`${step.titleEn}-${index}`} className="rounded-2xl border border-slate-100 p-4 sm:p-5">
                    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                      {(showBoth || !isKhmer) && <div>
                        <h3 className="font-extrabold">{step.titleEn}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{step.bodyEn}</p>
                      </div>}
                      {(showBoth || isKhmer) && <div className="border-t border-slate-100 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                        <h3 className="font-extrabold">{step.titleKm}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{step.bodyKm}</p>
                      </div>}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-3xl border border-[var(--line)] bg-white p-5 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--brand)]">{isKhmer ? "ទ្រឹស្តី និងរូបមន្ត" : "Theory and formula"}</p>
                <h2 className="mt-2 text-xl font-black">{isKhmer ? result.theory.nameKm : result.theory.nameEn}</h2>
                <p className="mt-4 overflow-x-auto rounded-xl bg-slate-50 p-4 font-mono text-base font-bold text-[var(--ink)]">{result.theory.formula}</p>
                {(showBoth || !isKhmer) && <p className="mt-4 text-sm leading-7 text-slate-600">{result.theory.explainEn}</p>}
                {(showBoth || isKhmer) && <p className="mt-3 text-sm leading-7 text-slate-600">{result.theory.explainKm}</p>}
              </article>

              <article className="rounded-3xl border border-[var(--line)] bg-white p-5 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--brand)]">{isKhmer ? "ប្រវត្តិ និងអ្នកគណិតវិទូ" : "History and mathematicians"}</p>
                <h2 className="mt-2 text-xl font-black">{isKhmer ? result.history.headingKm : result.history.headingEn}</h2>
                {(showBoth || !isKhmer) && <p className="mt-3 text-sm leading-7 text-slate-600">{result.history.bodyEn}</p>}
                {(showBoth || isKhmer) && <p className="mt-3 text-sm leading-7 text-slate-600">{result.history.bodyKm}</p>}
                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-400">{isKhmer ? "អ្នកដែលបានរួមចំណែក" : "Contributors"}</p>
                <p className="mt-2 text-sm font-semibold">{result.history.names.join(" · ")}</p>
                <div className="mt-4 flex flex-col gap-2">
                  {result.history.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="text-sm font-bold text-[var(--brand)] hover:underline">{source.label} ↗</a>)}
                </div>
              </article>
            </div>

            <div className="rounded-3xl bg-[var(--ink)] p-5 text-white sm:p-7">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-200">{isKhmer ? "សម្រង់សម្ដីដែលមានប្រភពផ្ទៀងផ្ទាត់ · Galileo, The Assayer (1623)" : "Verified historical quotation · Galileo, The Assayer (1623)"}</p>
              {(showBoth || !isKhmer) && <blockquote className="mt-3 text-lg font-semibold leading-8">“It is written in the language of mathematics, and its characters are triangles, circles, and other geometrical figures.”</blockquote>}
              {(showBoth || isKhmer) && <p className="mt-3 text-sm leading-6 text-slate-300">បកប្រែជាភាសាខ្មែរ៖ «វាត្រូវបានសរសេរជាភាសាគណិតវិទ្យា ហើយអក្សររបស់វាគឺជាត្រីកោណ រង្វង់ និងរូបធរណីមាត្រផ្សេងៗទៀត»។</p>}
              {(showBoth || !isKhmer) && <p className="mt-3 text-xs text-slate-300">This is a statement about mathematics as a language for describing nature, not a quotation explaining the specific rule used above.</p>}
              {(showBoth || isKhmer) && <p className="mt-3 text-xs text-slate-300">នេះជាសម្រង់អំពីគណិតវិទ្យាជាភាសាសម្រាប់ពិពណ៌នាអំពីធម្មជាតិ មិនមែនជាសម្រង់ដែលពន្យល់ច្បាប់ជាក់លាក់ដែលបានប្រើខាងលើទេ។</p>}
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                <a href="https://galileo.ou.edu/exhibits/assayer-early-state.html" target="_blank" rel="noreferrer" className="inline-flex text-sm font-bold text-blue-200 hover:underline">University of Oklahoma — original work record ↗</a>
                <a href="https://www.cambridge.org/core/books/abs/gravity-and-strings/gravitating-pointparticles/1B14C49B73102D627C5EE6EE379D9CAA" target="_blank" rel="noreferrer" className="inline-flex text-sm font-bold text-blue-200 hover:underline">Cambridge University Press — quote context ↗</a>
              </div>
            </div>

            <p className="rounded-2xl bg-slate-50 px-4 py-3 text-xs leading-6 text-slate-500">{isKhmer ? result.noticeKm : result.noticeEn}</p>
          </section>
        )}

        <section className="mt-8 rounded-3xl border border-[var(--line)] bg-white p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{isKhmer ? "ឧបករណ៍បន្ថែម" : "More mathematics tools"}</p>
              <h2 className="mt-2 text-xl font-black">{isKhmer ? "បន្តសិក្សាដោយរូបភាព" : "Continue learning visually"}</h2>
            </div>
            <Link href="/tools/exponential-graph" className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm font-bold text-[var(--brand)] hover:bg-blue-50">{isKhmer ? "បើកកម្មវិធីគូរក្រាប →" : "Open Graph Explorer →"}</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
